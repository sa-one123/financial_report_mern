import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    name : string;
    unitsSold : number;
    pricePerUnit : number;
}

const ProductSchema: Schema = new Schema({
    name : { type : String, required : true },
    unitsSold : { type : String, required : true },
    pricePerUnit: { type : Number, required : true }
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);