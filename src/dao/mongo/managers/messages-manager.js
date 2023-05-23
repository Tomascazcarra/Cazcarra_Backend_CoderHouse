import messagesModel from "../models/messages";

export default class MessageManager {

    getMessages = (params) => {
        return messagesModel.find(params).lean();
    }
    createMessage = (message) =>{
        return messagesModel.create(message);
    }
}