import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'review-book',
    brokers: ['demo-kafka:9092']
})