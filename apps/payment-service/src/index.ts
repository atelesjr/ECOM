import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { shouldBeUser } from '../middleware/authMiddleware.js';
import stripe from './utils/stripe.js';

const app = new Hono();

app.use('*', clerkMiddleware());

app.get('/health', (c) => {
	return c.json({
		status: 'ok',
		uptime: process.uptime(),
		timeStamp: Date.now(),
	});
});

app.post('/create-stripe-product', async (c) => {
	const res = await stripe.products.create({
		id: '123',
		name: 'Test Product',
		default_price_data: {
			currency: 'usd',
			unit_amount: 10 * 100,
		},
	});

	return c.json(res);
});

app.get('/stripe-product-price', async (c) => {
	const res = await stripe.prices.list({
		product: '123',
	});

	return c.json(res);
});

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
