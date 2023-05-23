import mongoose from "mongoose";

const collection = "products";

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:String,
    stock:String,
},{timestamps:{createdAt:"created_at", updatedAt:"update_at"}});

const productsModel = mongoose.model(collection, productSchema);

export default productsModel;