import { FastifyReply, FastifyRequest } from 'fastify';
import { clerkPlugin, getAuth } from '@clerk/fastify';

declare module 'fastify' {
	interface FastifyRequest {
		userId?: string;
	}
}

export const shouldBeUser = async (
	request: FastifyRequest,
	response: FastifyReply,
) => {
	const { userId } = getAuth(request);

	if (!userId) {
		return response
			.status(401)
			.send({ message: 'You are not logged in Order Service' });
	}

	request.userId = userId; // Attach userId to the request object for downstream handlers
};
