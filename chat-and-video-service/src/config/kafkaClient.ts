import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'authentication',
    brokers: ['demo-kafka:9092']
})