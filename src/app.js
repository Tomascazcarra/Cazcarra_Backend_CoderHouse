import express, { response } from "express";
import ProductManager from "../product_manager.js";
import productsRoutes from "./routes/products-routes.js"
import cartRoutes from "./routes/cart-routes.js"

const app = express();
app.use(express.json());
app.use("/api/products", productsRoutes)
app.use("/api/cart", cartRoutes)


app.listen(8080,()=>console.log("listening on PORT 8080"));