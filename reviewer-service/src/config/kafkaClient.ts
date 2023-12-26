import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'reviewer',
    brokers: ['demo-kafka:9092']
})