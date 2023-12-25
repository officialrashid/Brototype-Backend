

import { kafka } from "../config/kafkaClient";

// imposrt { handleMessage } from "../event/handleMessages.js";
// import {orderProducer} from "../event/orderProducer.js"
const consumer = kafka.consumer({
    groupId: 'fumigation-service'
});

export const consumeFumigation = async () => {
    console.log("Consumer started");
    try {
        await consumer.connect();
        console.log('Consumer connected');

        await consumer.subscribe({ topic: 'fumigation', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => {
                console.log(message, "ooooooooooooooooooooo");
                console.log(message.value, "ooooooooooooooooooooo1111111111111");
                const binaryData:any = message.value;
                const jsonString = binaryData?.toString(); // Convert binary data to a string
                console.log(jsonString, "after convert to string");
                const jsonData = JSON.parse(jsonString); // Parse the string as JSON
                console.log("Received JSON dataaaaaaaaaaaaaaaaaa:", jsonData.data);

                const messageType = jsonData.type;
                console.log("Received message type:", messageType);

                // Call handleMessage and wait for it to complete
                // const response = await handleMessage(jsonData.data, messageType);

                // console.log("response in handle message", response);

                // Further processing or logging based on the response
                // if (response) {
                //     await orderProducer(response, 'product','successOrdered')
                // }
              
            }
        });
    } catch (err) {
        console.error('Error in Kafka consumer:', err);
    }
};

// Call the consumeOrder function to start the consumer
consumeFumigation();
