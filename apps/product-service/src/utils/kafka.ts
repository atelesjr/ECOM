import {
	createKafkaClient,
	createKafkaConsumer,
	createKafkaProducer,
} from '@repo/kafka';

const kafkaClient = createKafkaClient('product-service');

export const producer = createKafkaProducer(kafkaClient);
export const consumer = createKafkaConsumer(kafkaClient, 'product-group');
