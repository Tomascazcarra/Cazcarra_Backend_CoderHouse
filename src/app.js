import express, { response } from "express";
import mongoose from "mongoose";
import chatRoutes from "./routes/fileSystem/chat-routes.js"
import handlebars from "express-handlebars";
import registerChatHandler from "./dao/listeners/chatHandler.js"
import __dirname from "./utils.js";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import config from "./config/config.js";
import { Command } from "commander";
import { setOptions } from "./options.js";
import errorHandler from "./middlewares/error.js"
import attachLogger from "./middlewares/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const program = new Command();
program
.option("--persistence <persistence>","Valor de persistencia");
program.parse(process.argv);
const options = program.opts();
setOptions(options);

const {default: userRoutesMongo} = await import("./routes/mongo/users-mongo.js")
const {default: cartsRoutesMongo} = await import("./routes/mongo/cart-mongo.js")
const {default: productsRoutesMongo} = await import("./routes/mongo/products-mongo.js")
const {default: sessionsRouter} = await import("./routes/mongo/session-mongo.js")
const {default: viewsRoutes} = await import("./routes/views-routes.js")
const {default: logRoutes} = await import("./routes/logger-routes.js")

const app = express();
const PORT = config.app.PORT
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`));
const io = new Server(server);
const connection = mongoose.connect(config.mongo.URL)

const swaggerOptions = {
    definition: {
        openapi:"3.0.1",
        info: {
            title:"Documentacion backend",
            description:"Docuementacion para entregas finales"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(attachLogger);

app.use(errorHandler)

app.use(session({
    store: new MongoStore ({
        mongoUrl:config.mongo.URL,
        ttl:3600
    }),
    secret:"ecommerce",
    resave: true,
    saveUninitialized:true
}))

app.use(passport.initialize());
initializePassport();
app.use(passport.session());


app.use((req,res,next)=>{
    req.io = io;
    next();
})
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use("/log", logRoutes);
app.use("/api/products", productsRoutesMongo);
app.use("/api/carts", cartsRoutesMongo);
app.use("/api/users", userRoutesMongo);
app.use("/", viewsRoutes);
app.use("/chat", chatRoutes);
app.use("/api/sessions", sessionsRouter);
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use("/deleteuser", viewsRoutes);

const messages = [];
io.on("connection",socket =>{
    registerChatHandler(io, socket)
    socket.on("authenticated", data=>{
        socket.broadcast.emit("newUserConected", data)
    })
});
