import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'fumigation',
    brokers: ['localhost:9092']
})