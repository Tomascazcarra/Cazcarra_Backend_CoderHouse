import mongoose from "mongoose";
import config from "../../config/config.js";
import { getOptions } from "../../options.js";

const options = getOptions()
const persistence = (options !== null && options.persistence !== null) ? options.persistence : config.app.PERSISTENCE;

export default class CartPersistenceFactory {
    static async getPersistence() {
        let cartDao;
        switch(persistence) {
            case "MONGO":
                mongoose.connect(config.mongo.URL);
                const {default: MongoDao} = await import ("../mongo/managers/carts-manager.js");
                cartDao = new MongoDao();
                break;
        }
        return cartDao
    }
}