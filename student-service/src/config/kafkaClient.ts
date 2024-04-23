import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'review-events',
    brokers: ['demo-kafka:9092']
})