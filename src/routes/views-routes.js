import { Router } from "express";
import ProductManager from "../../product_manager.js";

const router = Router();

router.get("/", async(req, res)=>{
    let pm = new ProductManager("./productos.json");
    const productos = await pm.getProducts();
    res.render("home", {
        productos: productos
    });
});

router.get("/realtimeproducts", (req, res)=>{
    res.render("realTimeProducts");
});

export default router;