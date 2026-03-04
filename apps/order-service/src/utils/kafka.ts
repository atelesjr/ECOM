import {
	createKafkaConsumer,
	createKafkaClient,
	createKafkaProducer,
} from '@repo/kafka';

const kafkaClient = createKafkaClient('order-service');

export const producer = createKafkaProducer(kafkaClient);
export const consumer = createKafkaConsumer(kafkaClient, 'order-group');
