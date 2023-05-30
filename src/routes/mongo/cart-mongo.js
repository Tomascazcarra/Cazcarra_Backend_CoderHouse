import { Router } from "express";
import CartMongoManager from "../../dao/mongo/managers/carts-manager.js"

const router = Router();
const cartsService = new CartMongoManager;

router.get("/", async (req, res) =>{
    const carts = await cartsService.getCarts();
    res.send({status:"success", payload:carts})
})

router.post("/", async (req, res) =>{
    const cart = {"products":[]};
    const result = await cartsService.createCarts(cart);
    res.sendStatus(201);
})

router.get("/:cid", async (req, res) =>{
    const {cid} = req.params;
    const carts = await cartsService.getCartsBy({_id: cid});
    if(!carts) res.status(404).send({status:"error", error: "carrito no encontrado"})
    res.send({status:"success", payload:carts})
})

 /*
router.delete("/:cid", async(req,res)=>{
    const {cid} = req.params;
    const result = await cartsService.deleteCarts(cid)
    res.send({status:"success"})
})
*/

router.post("/:cid/product/:pid", async (req, res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    const result = await cartsService.addProductToCart(cid, pid)
    res.send({status:"success", message:"producto agregado al carrito"});
});

router.delete("/:cid/products/:pid", async(req, res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    const result = await cartsService.deleteProductFromCart(cid, pid)
    res.send({status:"success"})
});

router.put("/:cid", async(req, res)=>{
    let cid = req.params.cid;
    const {products} = req.body;
    const result = await cartsService.updateProductsFromCart(cid, products)
    res.send({status: "success"})
})

router.put("/:cid/products/:pid", async(req, res) =>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    const {quantity} = req.body;
    console.log(quantity)
    const result = await cartsService.updateQuantityFromProduct(cid, pid, quantity)
    res.send({status: "success"})
}) 

router.delete("/:cid", async(req, res)=>{
    let cid = req.params.cid;
    const result = await cartsService.deleteProductsFromCart(cid)
    res.send({status: "success"})
});


export default router;
