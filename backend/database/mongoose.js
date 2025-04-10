import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";

const connectToDatabase = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }

        const connect = await mongoose.connect(MONGO_URI);
        console.log(`Connected to MongoDB: ${connect.connection.host}/${connect.connection.name}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
}

export default connectToDatabase;