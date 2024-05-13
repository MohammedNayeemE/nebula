
import mongoose from "mongoose";
import config from "./config";

const connectToDb = async () => {
    try {
        await mongoose.connect(config.mongouri);
        console.log(`Connected To DB`);
        return true;
    } catch (err) {
        console.error(`Error Connecting to database`, err);
        return false;
    }
};

export {connectToDb};