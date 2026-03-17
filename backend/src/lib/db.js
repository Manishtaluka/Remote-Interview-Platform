import mongoose from "mongoose";
import {ENV} from "./env.js";

 export const connectDB= async() => {
    try{
        console.log("DB URL:", ENV.DB_URL);
        const conn= await mongoose.connect(ENV.DB_URL);
        console.log("Connected to MongoDB:",conn.connection.host);

    }catch(error){
        console.error("Error connecting to MongoBD:",error);
        process.exit(1);//0 means success and 1 means failure
    }

 };