import express, { Request, Response } from 'express';
import cors from 'cors';
import { clerkMiddleware, getAuth } from '@clerk/express';
import { shouldBeUser } from './middleware/authMiddleware.js';
import productRouter from './routes/product.route';
import categoryRouter from './routes/category.route';

const app = express();

app.use(
	cors({
		origin: ['http://localhost:3002', 'http://localhost:3003'],
		credentials: true,
	}),
);

app.use(express.json());

app.use(clerkMiddleware());

app.get('/health', (req: Request, res: Response) => {
	return res.json({
		status: 'ok',
		uptime: process.uptime(),
		timeStamp: Date.now(),
	});
});

app.get('/test', shouldBeUser, (req: Request, res: Response) => {
	res.json({
		message: 'Product Service authenticated successfully',
		userId: req.userId,
	});
});

app.use('/products', productRouter);

app.use('/categories', categoryRouter);

// Error handler must be last
app.use((err: any, req: Request, res: Response, next: Function) => {
	console.log(err);
	return res
		.status(err.status || 500)
		.json({ error: err.message || 'Internal Server Error' });
});

app.listen(8000, () => {
	console.log('Product service is running on port 8000');
});
