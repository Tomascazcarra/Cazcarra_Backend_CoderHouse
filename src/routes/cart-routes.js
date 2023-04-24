import { Router } from "express";
import CartManager from "../../cart_manager.js";
const router = Router();


router.post("/", (req, res)=>{
    const products = req.body;
    var cm = new CartManager("./carrito.json");
    cm.addCart(products)
    res.send({status:"success", message:"carrito creado"});
});

router.get("/:cid", (req, res)=>{
    var cid = parseInt(req.params.cid)
    var cm = new CartManager("./carrito.json");
    var products = cm.getProductsFromCart(cid);
    if (!products) return res.status(404).send({status: "error", error: "carrito vacio"});
    else return res.send(products);
});

router.post("/:cid/product/:pid", (req, res)=>{
    var cid = parseInt(req.params.cid)
    var pid = parseInt(req.params.pid)
    var cm = new CartManager("./carrito.json");
    cm.addProductToCart(cid, pid)
    res.send({status:"success", message:"producto agregado al carrito"});
});

export default router;