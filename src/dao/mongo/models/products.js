import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true
    },
    description: String,
    price: Number,
    stock: Number,
    category: String,
    owner: {
        type: String,
        default: "admin"
    }

}, { timestamps: { createdAt: "created_at", updatedAt: "update_at" } });

productSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(collection, productSchema);

export default productsModel;