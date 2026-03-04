import {
	createKafkaProducer,
	createKafkaClient,
	createKafkaConsumer,
} from '@repo/kafka';

const kafkaClient = createKafkaClient('payment-service');

export const producer = createKafkaProducer(kafkaClient);
export const consumer = createKafkaConsumer(kafkaClient, 'payment-group');
