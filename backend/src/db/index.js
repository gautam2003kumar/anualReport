import mongoose from "mongoose";

import {DB_NAME} from "../constants.js";
import { setAdmin } from "../utils/setAdmin.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`); 
        await setAdmin();
    } catch (error) {
        console.log("MONGODB connection FAILED", error);
        process.exit(1)
    }
}

export default connectDB