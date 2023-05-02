import express, { response } from "express";
import productsRoutes from "./routes/products-routes.js";
import cartRoutes from "./routes/cart-routes.js";
import viewsRoutes from "./routes/views-routes.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import {productos} from "./routes/views-routes.js";


const app = express();
app.use(express.json());
app.use("/api/products", productsRoutes)
app.use("/api/cart", cartRoutes)
app.use("/", viewsRoutes)
app.use(express.static(`${__dirname}/public`))


app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");



const server = app.listen(8080,()=>console.log("listening on PORT 8080"));
const io = new Server(server);



io.on("connection", socket => {
    console.log("nuevo cliente conectado")
    socket.on("message", data =>{
        productos.push(data);
        socket.emit("logs", productos);
    })
    socket.on("delete", data =>{
        console.log(data)
        
        const productoIndex = productos.findIndex(function(producto) {
            return producto.name === data.name;
          });
        if(productoIndex !== -1){
            productos.splice(productoIndex, 1);
        }
        socket.emit("logs", productos);
    })
})