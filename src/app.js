import express, { response } from "express";
import mongoose from "mongoose";
import productsRoutes from "./routes/fileSystem/products-routes.js";
import cartRoutes from "./routes/fileSystem/cart-routes.js";
import chatRoutes from "./routes/fileSystem/chat-routes.js"
import viewsRoutes from "./routes/views-routes.js";
import cartsRoutesMongo from "./routes/mongo/cart-mongo.js";
import productsRoutesMongo from "./routes/mongo/products-mongo.js";
import handlebars from "express-handlebars";
import registerChatHandler from "./dao/listeners/chatHandler.js"
import __dirname from "./utils.js";
import { Server } from "socket.io";

const app = express();
const connection = mongoose.connect("mongodb+srv://toto:123@cluster0.shnasqm.mongodb.net/?retryWrites=true&w=majority")
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`listening on ${PORT}`));
const io = new Server(server);

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
app.use ("/chat", chatRoutes);
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