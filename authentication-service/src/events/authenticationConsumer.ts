
import { kafka } from "../config/kafkaClient";
import handleKafkaMessages from "../events/handleKafkaMessages"
import eventEmitter from '../events/eventEmitter';
const consumer = kafka.consumer({
    groupId: 'authentication-service'
});

export const consumeAuthentication = async () => {
    console.log("Consumer started");
    try {
        await consumer.connect();
        console.log('Consumer connected');

        await consumer.subscribe({ topic: 'authentication', fromBeginning: true });
        await consumer.subscribe({ topic: 'review-events', fromBeginning: true });
        // await consumer.subscribe({ topic: 'advisors-task', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => {
                const binaryData = message?.value;
                const jsonString: any = binaryData?.toString(); // Convert binary data to a string
                console.log(jsonString, "after convert to string");
                const jsonData = JSON.parse(jsonString); // Parse the string as JSON


                const messageType = jsonData?.type;
          

                if (messageType === "review-scheduler-data") {
                    const response = await handleKafkaMessages("getReviewStudents", messageType);
                } else if (messageType === "updateProfile") {
                    console.log(jsonData.data, "updateProfile updateProfile updateProfile");

                    const response = await handleKafkaMessages(jsonData.data, messageType);
                } else if (messageType === "advisors-task") {
                    const response = await handleKafkaMessages(jsonData.data, messageType);
                }
                // Call handleMessage and wait for it to complete
                const response = await handleKafkaMessages(jsonData.data, messageType);

                console.log(response, "response coming return the consumer");


                if (response) {
                    console.log("response il kerriiiiiiiiii++++++++");

                    eventEmitter.emit('authDataResponse', response);
                }
            }

        });
    } catch (err) {
        console.error('Error in Kafka consumer:', err);
    }
};

// Call the consumeOrder function to start the consumer
consumeAuthentication();
