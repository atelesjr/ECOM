import express, { Request, Response } from 'express';
import cors from 'cors';
import { clerkMiddleware, getAuth } from '@clerk/express';
import { shouldBeUser } from './middleware/authMiddleware.js';

const app = express();
app.use(
	cors({
		origin: ['http://localhost:3002', 'http://localhost:3003'],
		credentials: true, // Allow requests from the frontend
	}),
);

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

app.listen(8000, () => {
	console.log('Product service is running on port 8000');
});
