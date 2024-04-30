

import { kafka } from "../config/kafkaClient";
import handleKafkaMessage from "./handleKafkaMessages"

const consumer = kafka.consumer({
    groupId: 'review-events'
});

export const consumeStudent = async () => {
    console.log("Consumer started");
    try {
        await consumer.connect();
        console.log('Consumer connected');

        // await consumer.subscribe({ topic: 'review-events', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => {
                const binaryData:any = message.value;
                const jsonString = binaryData?.toString(); // Convert binary data to a string
                console.log(jsonString, "after convert to string");
                const jsonData = JSON.parse(jsonString); // Parse the string as JSON
                console.log("Received JSON dataaaaaaaaaaaaaaaaaa:", jsonData.data);

                const messageType = jsonData.type;
                console.log("Received message type:", messageType);
                if(messageType==="review-scheduler-data"){
                    handleKafkaMessage("getReviewStudents",messageType)
                }
              
            }
        });
    } catch (err) {
        console.error('Error in Kafka consumer:', err);
    }
};

// Call the consumeOrder function to start the consumer
consumeStudent();
