import Fastify from 'fastify';
import { clerkPlugin, getAuth } from '@clerk/fastify';

const fastify = Fastify({ logger: true });

fastify.register(clerkPlugin);

fastify.get('/health', async (request, reply) => {
	return reply.status(200).send({
		status: 'ok',
		uptime: process.uptime(),
		timeStamp: Date.now(),
	});
});

fastify.get('/test', async (request, reply) => {
	const { userId } = getAuth(request);

	if (!userId) {
		return reply.status(401).send({ error: 'Unauthorized' });
	}

	return reply
		.status(200)
		.send({ message: 'Order Service authenticated successfully' });
});

const start = async () => {
	try {
		await fastify.listen({ port: 8001 });
		console.log('Order Service is running on port 8001');
	} catch (err) {
		console.error('Error starting Order Service:', err);
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
