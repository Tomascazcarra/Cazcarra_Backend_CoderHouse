import ticketModel from "../models/ticket.js";

export default class ticketMongoManager{

    getTickets = () =>{
        return ticketModel.find().lean().populate()
    }

    getTicketsBy = (params) =>{
        return ticketModel.findOne(params).lean().populate()
    }

    createTickets = (ticket) =>{
        return ticketModel.create(ticket);
    }

    deleteCarts = (id) => {
        return ticketModel.findByIdAndDelete(id);
    }
}