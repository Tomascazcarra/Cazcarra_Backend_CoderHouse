import { Router } from "express";
import ProductsMongoManager from "../../dao/mongo/managers/products-manager.js"

const router = Router();
const productsService = new ProductsMongoManager;

router.get("/", async (req, res) =>{
    const products = await productsService.getProducts();
    res.send({status:"success", payload:products})
})

router.post("/", async (req, res) =>{
    const {title, description, price, stock} = req.body;
    if(!title || !description || !price || !stock) return res.status(400).send({status:"error", error:"faltan campos"})
    const products = {
        title,
        description,
        price,
        stock
    }
    const result = await productsService.createProducts(products);
    res.sendStatus(201);
})

router.get("/:pid", async (req, res) =>{
    const {pid} = req.params;
    const products = await productsService.getProductsBy({_id: pid});
    if(!products) res.status(404).send({status:"error", error: "Producto no encontrado"})
    res.send({status:"success", payload:products})
})

router.put("/:pid", async(req,res)=>{
    const {pid} = req.params;
    const updateProducts = req.nody;
    const result = await productsService.updateProducts(pid, updateProducts)
    res.sendStatus(201);
})

router.delete("/:pid", async(req,res)=>{
    const {pid} = req.params;
    const result = await productsService.deleteProducts(pid)
    res.send({status:"success"})
})

export default router;
