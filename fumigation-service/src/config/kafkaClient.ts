import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'fumigation',
    brokers: ['demo-kafka:9092']
})