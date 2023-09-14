import mongoose from "mongoose";

const collection = "users";

const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    password:String,
    age:Number,
    cart:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"carts"
    },
    role:{
        type:String,
        default:"user"
    },
    documents: [{
        name:String,
        reference:String
    }]
})

const userModel = mongoose.model(collection, schema);

export default userModel;