import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "tickets";

const ticketSchema = new mongoose.Schema({
    id: String,
    code: String,
    purchaseDateTime: String,
    amount: Number,
    purchaser: String
}, { timestamps: { createdAt: "created_at", updatedAt: "update_at" } });

ticketSchema.plugin(mongoosePaginate);

const ticketModel = mongoose.model(collection, ticketSchema);

export default ticketModel;