import LoggerService from "../services/repositories/logger.services.js";
import config from "../config/config.js";


const logger = new LoggerService(config.app.LOGGER)

const attachLogger = (req, res, next) => {
    req.logger = logger.logger;
    req.logger.http("Peticion recibida");
    next();
}

export default attachLogger;