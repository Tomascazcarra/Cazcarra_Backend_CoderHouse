import express, { response } from "express";
import ProductManager from "../SegundoDesafio.js";

const app = express();

app.get("/products/:pid",(req,res)=>{
    var idProduct = req.params.pid;
    var pm = new ProductManager("./productos.json");
    const product = pm.getProductById(idProduct);
    if (!product) return res.send("Producto no encontrado");
    else return res.send(product);
});

app.get("/products",(req,res)=>{
    
    var pm = new ProductManager("./productos.json");
    var products = pm.getProducts();
    const limit = req.query["limit"]
    if (limit != undefined){
        return res.send(products.slice(0,limit))
    }
    else return res.send(products);
});

app.listen(8080,()=>console.log("listening on PORT 8080"));