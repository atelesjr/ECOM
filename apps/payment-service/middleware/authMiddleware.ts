import { getAuth } from '@hono/clerk-auth';
import { createMiddleware } from 'hono/factory';
import { CustomJwtSessionClaims } from '@repo/types';

export const shouldBeUser = createMiddleware<{
	Variables: {
		userId: string;
	};
}>(async (c, next) => {
	const { userId } = getAuth(c);

	if (!userId) {
		return c.json({ message: 'You are not logged in Payment service.' }, 401);
	}

	c.set('userId', userId);
	await next();
});

export const shouldBeAdmin = createMiddleware<{
	Variables: {
		userId: string;
	};
}>(async (c, next) => {
	const { userId, sessionClaims } = getAuth(c);

	if (!userId) {
		return c.json(
			{
				message: 'You are not logged in.',
			},
			401,
		);
	}

	const claims = sessionClaims as CustomJwtSessionClaims | undefined;

	if (claims?.metadata?.role !== 'admin') {
		return c.json({ message: 'Unauthorized!' }, 403);
	}

	c.set('userId', userId);

	await next();
});
