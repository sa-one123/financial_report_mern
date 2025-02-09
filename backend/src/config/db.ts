import mongoose from "mongoose";

const connectDB = async (): Promise<void>  =>{
    const MONGODB_URI = process.env.MONGO_URI || '';
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 50000, // Increase timeout
        });
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
}

// Ensure MongoDB is ready before running queries
const waitForDB = async () => {
    if (mongoose.connection.readyState !== 1) {
        console.log("⏳ Waiting for MongoDB connection...");
        await mongoose.connection.asPromise();
    }
};

export {
    connectDB,
    waitForDB   
}