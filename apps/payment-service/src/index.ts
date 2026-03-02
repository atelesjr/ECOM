import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { shouldBeUser } from './middleware/authMiddleware.js';
import sessionRoute from './routes/session.route.js';
import { cors } from 'hono/cors';
import webhookRoute from './routes/webhooks.route.js';

const app = new Hono();
const CLIENT_URL = process.env.CLIENT_URL!;

app.use('*', clerkMiddleware());
app.use('*', cors({ origin: CLIENT_URL }));

app.get('/health', (c) => {
	return c.json({
		status: 'ok',
		uptime: process.uptime(),
		timeStamp: Date.now(),
	});
});

app.route('/sessions', sessionRoute);
app.route('/webhooks', webhookRoute);

app.get('/test', shouldBeUser, (c) => {
	return c.json({
		message: 'You are logged in Payment service!',
		userId: c.get('userId'),
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
