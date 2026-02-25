import { FastifyInstance } from 'fastify';
import { shouldBeUser } from '../middleware/authMiddleware';
import { Order } from '@repo/order-db';

export const orderRoutes = async (fastify: FastifyInstance) => {
	fastify.get(
		'/user-orders',
		{ preHandler: shouldBeUser },
		async (request, reply) => {
			const orders = await Order.find({ userId: request.userId });
			return reply.status(200).send(orders);
		},
	);

	fastify.get(
		'/orders',
		{ preHandler: shouldBeUser },
		async (request, reply) => {
			try {
				const orders = await Order.find();
				return reply.status(200).send(orders);
			} catch (error) {
				console.error('Error fetching orders:', error);
				return reply.status(500).send({ error: 'Failed to fetch orders' });
			}
		},
	);
};
