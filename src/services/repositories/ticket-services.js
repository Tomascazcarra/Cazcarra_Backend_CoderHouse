export default class TicketService{
    constructor(dao){
        this.dao = dao;
    }

    getTickets = () =>{
        return this.dao.getTickets();
    }
    getTicketsBy = (params) =>{
        return this.dao.getTicketsBy(params);
    }
    createTickets = (ticket) =>{
        return this.dao.createTickets(ticket);
    }
    
    deleteTickets = (id) => {
        return this.dao.deleteTickets(id);
    }
}