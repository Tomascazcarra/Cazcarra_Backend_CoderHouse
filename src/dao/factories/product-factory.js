import mongoose from "mongoose";
import config from "../../config/config.js";
import { getOptions } from "../../options.js";

const options = getOptions()
const persistence = options.persistence || config.app.PERSISTENCE

export default class ProductPersistenceFactory {
    static async getPersistence() {
        let productDao;
        switch(persistence) {
            case "MONGO":
                mongoose.connect(config.mongo.URL);
                const {default: MongoDao} = await import ("../mongo/managers/products-manager.js");
                productDao = new MongoDao();
                break;
        }
        return productDao
    }
}