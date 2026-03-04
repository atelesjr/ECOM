import Fastify from 'fastify';
import { orderRoutes } from './routes/order.js';
import { clerkPlugin } from '@clerk/fastify';
import { shouldBeUser } from './middleware/authMiddleware.js';
import { connectToOrderDB } from '@repo/order-db';
import { consumer, producer } from './utils/kafka.js';

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get('/health', (request, reply) => {
	return reply.status(200).send({
		status: 'ok',
		uptime: process.uptime(),
		timestamp: Date.now(),
	});
});

fastify.get('/test', { preHandler: shouldBeUser }, (request, reply) => {
	return reply.send({
		message: 'Order service is authenticated!',
		userId: request.userId,
	});
});

fastify.register(orderRoutes);

const start = async () => {
	try {
		Promise.all([
			await connectToOrderDB(),
			await producer.connect(),
			await consumer.connect(),
		]);
		await fastify.listen({ port: 8001 });
		console.log('Order Service is running on port 8001');
	} catch (err) {
		console.error('Error starting Order Service:', err);
		process.exit(1);
	}
};

start();
