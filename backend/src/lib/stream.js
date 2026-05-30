import {StreamChat} from 'stream-chat';
import { ENV } from './env';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Stream API key and secret are required");
}
export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await chatClient.upsertUser(userData);
        console.log("Upserted Stream user:",userData);
    } catch (error) {
        console.error("Error upserting Stream user:", error);
        
    }       
};

export const deleteStreamUser = async (userId) => {
    try {
        await chatClient.deleteUser(userId);
        console.log("Deleted Stream user:", userId);
        
    } catch (error) {
        console.error("Error deleting the Stream user:", error);
        
    }       
};


//todo :add method to generate token 