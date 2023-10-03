import mongoose from "mongoose";
import config from "../../config/config.js";
import { getOptions } from "../../options.js";

const options = getOptions()
const persistence = (options != null && options.persistence != null) ? options.persistence : config.app.PERSISTENCE;

export default class UserPersistenceFactory {
    static async getPersistence() {
        let userDao;
        switch (persistence) {
            case "MONGO":
                mongoose.connect(config.mongo.URL);
                const { default: MongoDao } = await import("../mongo/managers/user-manager.js");
                userDao = new MongoDao();
                break;
        }
        return userDao
    }
}