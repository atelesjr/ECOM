import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';

const app = new Hono();

app.use('*', clerkMiddleware());

app.get('/health', (c) => {
	return c.json({
		status: 'ok',
		uptime: process.uptime(),
		timeStamp: Date.now(),
	});
});

app.get('/test', (c) => {
	const { userId } = getAuth(c);

	if (!userId) {
		return c.json({
			message: 'You are not logged in Payment service.',
		});
	}

	return c.json({
		message: 'You are logged in Payment service!',
	});
});

const start = async () => {
	try {
		serve(
			{
				fetch: app.fetch,
				port: 8002,
			},
			(info) => {
				console.log(`Server is running on http://localhost:${info.port}`);
			},
		);
	} catch (err) {
		console.error('Error starting Payment Service:', err);
		process.exit(1);
	}
};

start();
