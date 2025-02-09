import mongoose from "mongoose";
import ProductSeeder from "./ProductSeeder";
import { connectDB } from "../config/db";

const commonSeeder = async ()=>{
    await connectDB();
    
    try {
        await ProductSeeder();
        console.log("All Seeders Executed successfully");    
    } catch (error) {
      console.error("Error Running Seeders:", error)  
    } finally{
        mongoose.connection.close();
        console.log("Mongodb Connection Closed")
    }
}

commonSeeder();