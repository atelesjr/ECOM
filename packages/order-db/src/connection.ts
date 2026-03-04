import mongoose from 'mongoose';

let isConnected = false;

export const connectToOrderDB = async () => {
	if (isConnected) {
		return;
	}

	if (!process.env.MONGO_URL) {
		throw new Error('MONGO_URL environment variable is not defined');
	}

	try {
		await mongoose.connect(process.env.MONGO_URL);
		isConnected = true;
		console.log('Connected to Order DB successfully');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		throw error;
	}
};
