import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'authentication',
    brokers: ['localhost:9092']
})