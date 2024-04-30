import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'review-book',
    brokers: ['localhost:9092']
})