import {Kafka} from "kafkajs"

export const kafka = new Kafka({
    clientId: 'student',
    brokers: ['demo-kafka:9092']
})