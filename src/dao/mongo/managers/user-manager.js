import userModel from "../models/user.js";


export default class userMongoManager{

    getUser = () =>{
        return userModel.find().lean().populate()
    }

    getUserBy = (params) =>{
        return userModel.findOne(params).lean().populate()
    }

    updateUser = (id, user) =>{
        return userModel.findByIdAndUpdate(id,{$set:user})
    }
    deleteUser = (id) => {
        return userModel.findByIdAndDelete(id)
    }
}