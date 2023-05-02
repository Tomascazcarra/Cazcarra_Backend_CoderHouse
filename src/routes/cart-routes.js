import { Router } from "express";
import CartManager from "../../cart_manager.js";
const router = Router();


router.post("/", async (req, res)=>{
    const products = [];
    let cm = new CartManager("./carrito.json");
    await cm.addCart(products)
    res.send({status:"success", message:"carrito creado"});
});

router.get("/:cid", async (req, res)=>{
    let cid = parseInt(req.params.cid);
    let cm = new CartManager("./carrito.json");
    let products = await cm.getProductsFromCart(cid);
    if (!products) return res.status(404).send({status: "error", error: "carrito vacio"});
    else return res.send(products);
});

router.post("/:cid/product/:pid", async (req, res)=>{
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);
    let cm = new CartManager("./carrito.json");
    await cm.addProductToCart(cid, pid);
    res.send({status:"success", message:"producto agregado al carrito"});
});

export default router;