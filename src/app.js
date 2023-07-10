import express, { response } from "express";
import mongoose from "mongoose";
import chatRoutes from "./routes/fileSystem/chat-routes.js"
import viewsRoutes from "./routes/views-routes.js";
import cartsRoutesMongo from "./routes/mongo/cart-mongo.js";
import productsRoutesMongo from "./routes/mongo/products-mongo.js";
import handlebars from "express-handlebars";
import registerChatHandler from "./dao/listeners/chatHandler.js"
import __dirname from "./utils.js";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionsRouter from "./routes/mongo/session-mongo.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import config from "./config/config.js"

const app = express();
const PORT = config.app.PORT
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`));
const io = new Server(server);
const connection = mongoose.connect(config.mongo.URL)

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
app.use("/api/products", productsRoutesMongo);
app.use("/api/carts", cartsRoutesMongo);
app.use("/", viewsRoutes);
app.use("/chat", chatRoutes);
app.use("/api/sessions", sessionsRouter);
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

const messages = [];
io.on("connection",socket =>{
    registerChatHandler(io, socket)
    socket.on("authenticated", data=>{
        socket.broadcast.emit("newUserConected", data)
    })
});