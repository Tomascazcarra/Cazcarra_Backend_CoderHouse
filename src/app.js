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
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionsRouter from "./routes/mongo/session-mongo.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

const app = express();
const connection = mongoose.connect("mongodb+srv://toto:123@cluster0.shnasqm.mongodb.net/?retryWrites=true&w=majority")
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`));
const io = new Server(server);


app.use(cookieParser())
app.use(session({
    store: new MongoStore ({
        mongoUrl:"mongodb+srv://toto:123@cluster0.shnasqm.mongodb.net/?retryWrites=true&w=majority",
        ttl:3600
    }),
    secret:"ecommerce",
    resave: true,
    saveUninitialized:true
}))
/*
app.get("/setCookie", (req,res) =>{
    res.cookie("ecommerceCookie", "Primer cookie", {maxAge:10000}).send("Cookie")
})
app.get("/getCookies", (req,res) =>{
    res.send(req.cookies.ecommerceCookie);
})
app.get("/deleteCookie", (req,res)=>{
    res.clearCookie("ecommerceCookie").send("Cookie removed")
})
app.get("/session", (req,res) =>{
    if (req.session.counter) {
        req.session.counter++,
        res.send(`se visito el sitio ${req.session.counter} veces`)
    } else {
        req.session.counter = 1;
        res.send("bienvenido")
    }
})
app.get("/logout", (req,res)=>{
    req.session.destroy(err =>{
        if(!err) res.send("Logout ok")
        else res.send({status:"logout error", body: err})
    })
})
app.get("/login", (req,res)=>{
    const {username, password} = req.query;

    if (username !== "toto" || password !== "toto123") {
        return res.send("login failed")
    }
    req.session.user = username;
    req.session.admin = true;
    res.send("login success");
})
*/
app.use(passport.initialize());
initializePassport();

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