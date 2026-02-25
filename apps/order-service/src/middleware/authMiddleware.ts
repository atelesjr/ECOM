import { getAuth } from '@clerk/fastify';
import { FastifyReply, FastifyRequest } from 'fastify';

declare module 'fastify' {
	interface FastifyRequest {
		userId?: string;
		auth?: any;
	}
}

export const shouldBeUser = async (
	request: FastifyRequest,
	response: FastifyReply,
) => {
	const { userId } = getAuth(request);

	console.log('Authentication info from Clerk:', request.auth);
	console.log('Authenticated user ID:', userId);

	if (!userId) {
		return response
			.status(401)
			.send({ message: 'You are not logged in Order Service' });
	}

	request.userId = userId;
};

export const shouldBeAdmin = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const auth = getAuth(request);
	if (!auth.userId) {
		return reply.status(401).send({ message: 'You are not logged in!' });
	}

	const role = (auth.sessionClaims as { metadata?: { role?: string } }).metadata
		?.role;

	if (role !== 'admin') {
		return reply.status(403).send({ message: 'Unauthorized!' });
	}

	// const claims = auth.sessionClaims as CustomJwtSessionClaims;

	// if (claims.metadata?.role !== "admin") {
	//   return reply.status(403).send({ message: "Unauthorized!" });
	// }

	request.userId = auth.userId;
};
