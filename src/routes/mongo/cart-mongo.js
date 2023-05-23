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

router.delete("/:cid", async(req,res)=>{
    const {cid} = req.params;
    const result = await cartsService.deleteCarts(cid)
    res.send({status:"success"})
})

router.post("/:cid/product/:pid", async (req, res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    cartsService.addProductToCart(cid, pid)
    res.send({status:"success", message:"producto agregado al carrito"});
});

export default router;
