import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'review-events',
    brokers: ['localhost:9092']
})