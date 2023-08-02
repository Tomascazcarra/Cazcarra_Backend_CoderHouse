import winston from "winston"

export default class LoggerService {
    constructor(env){
        this.options = {
            levels:{
                fatal:0,
                error:1,
                warning:2,
                http:3,
                info:4,
                debug:5
            }
        }
        this.logger = this.createLogger(env)
    }

    createLogger = (env) =>{
       switch(env){
            case "dev":
            return winston.createLogger({
                levels: this.options.levels,
                transports: [
                    new winston.transports.Console({level:"debug"}),
                    new winston.transports.File({level:"debug", filename:"./errors.log"})
                ]
            })
            case "prod": 
            return winston.createLogger({
                levels: this.options.levels,
                transports: [
                    new winston.transports.Console({level:"info"}),
                    new winston.transports.File({level:"info", filename:"./errors.log"})
                ]
            })

       }

    }
}