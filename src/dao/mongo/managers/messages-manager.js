import messagesModel from "../models/messages.js";

export default class MessageManager {

    getMessages = (params) => {
        return messagesModel.find(params).lean();
    }
    createMessage = (message) =>{
        return messagesModel.create(message);
    }
}