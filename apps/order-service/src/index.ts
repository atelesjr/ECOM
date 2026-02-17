import Fastify from 'fastify';
import { clerkPlugin, getAuth } from '@clerk/fastify';
import { shouldBeUser } from './middleaware/authMiddleware.js';

const fastify = Fastify({ logger: true });

fastify.register(clerkPlugin);

fastify.get('/health', (request, reply) => {
	return reply.status(200).send({
		status: 'ok',
		uptime: process.uptime(),
		timeStamp: Date.now(),
	});
});

fastify.get('/test', { preHandler: shouldBeUser }, (request, reply) => {
	return reply.status(200).send({
		message: 'Order Service authenticated successfully',
		userId: request.userId,
	});
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
