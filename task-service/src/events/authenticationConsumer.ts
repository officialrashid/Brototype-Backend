
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
        await consumer.run({
            eachMessage: async ({ message }) => {
                console.log(message, "ooooooooooooooooooooo");
                console.log(message.value, "ooooooooooooooooooooo1111111111111");
                const binaryData = message?.value;
                const jsonString:any = binaryData?.toString(); // Convert binary data to a string
                console.log(jsonString, "after convert to string");
                const jsonData = JSON.parse(jsonString); // Parse the string as JSON
                console.log("Received JSON dataaaaaaaaaaaaaaaaaa\\\\\\\\\\////////////////////////////:", jsonData.data);

                const messageType = jsonData?.type;
                console.log("Received message type:", messageType);

                // Call handleMessage and wait for it to complete
               const response = await handleKafkaMessages(jsonData.data, messageType);
                
                  console.log(response,"response coming return the consumer");
                  

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
