import mongoose from "mongoose";
import config from "../../config/config.js";
import { getOptions } from "../../options.js";

const options = getOptions()
const persistence = options.persistence || config.app.PERSISTENCE

export default class TicketPersistenceFactory {
    static async getPersistence() {
        let ticketDao;
        switch(persistence) {
            case "MONGO":
                mongoose.connect(config.mongo.URL);
                const {default: MongoDao} = await import ("../mongo/managers/ticket-manager.js");
                ticketDao = new MongoDao();
                break;
        }
        return ticketDao
    }
}