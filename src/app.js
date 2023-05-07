import express, { response } from "express";
import productsRoutes from "./routes/products-routes.js";
import cartRoutes from "./routes/cart-routes.js";
import viewsRoutes from "./routes/views-routes.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

const app = express();
const server = app.listen(8080,()=>console.log("listening on PORT 8080"));
const io = new Server(server);

app.use((req,res,next)=>{
    req.io = io;
    next();
})
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api/products", productsRoutes)
app.use("/api/carts", cartRoutes)
app.use("/", viewsRoutes)
app.use(express.static(`${__dirname}/public`))

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");


io.on("connection", socket => {
    console.log("nuevo cliente conectado")

})