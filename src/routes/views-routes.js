import { Router } from "express";
import ProductManager from "../dao/fileSystem/managers/product_manager.js";
import productsMongoManager from "../dao/mongo/managers/products-manager.js";

const router = Router();
const productsService = new productsMongoManager();

/*
// Home utilizando fileSystem 
router.get("/", async(req, res)=>{
    let pm = new ProductManager("./productos.json");
    const productos = await pm.getProducts();
    res.render("home", {
        productos: productos
    });
});
*/

router.get("/", async(req, res)=>{
    const products = await productsService.getProducts();
    res.render("productsmongo", {products})
});


router.get("/realtimeproducts", (req, res)=>{
    res.render("realTimeProducts");
});

router.get("/chat" , (req, res)=>{
    res.render("Chat")
})

export default router;