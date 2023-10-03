import mongoose from "mongoose";
import productSchema from "./products.js"

const collection = "carts";

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: "products"
                },
                quantity: Number
            }

        ],
        default: []
    },


}, { timestamps: { createdAt: "created_at", updatedAt: "update_at" } });

const cartsModel = mongoose.model(collection, cartSchema);

export default cartsModel;