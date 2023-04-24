import { Router } from "express";
import ProductManager from "../../product_manager.js";

const router = Router();

router.get("/:pid",(req,res)=>{
    var idProduct = req.params.pid;
    var pm = new ProductManager("./productos.json");
    const product = pm.getProductById(idProduct);
    if (!product) return res.status(404).send({status: "error", error: "Producto no encontrado"});
    else return res.send(product);
});

router.get("/",(req,res)=>{
    
    var pm = new ProductManager("./productos.json");
    var products = pm.getProducts();
    const limit = req.query["limit"]
    if (limit != undefined){
        return res.send(products.slice(0,limit))
    }
    else return res.send(products);
});

router.post("/", (req,res)=>{
    const product = req.body;
    var pm = new ProductManager("./productos.json");
    pm.addProduct(product);
    res.send({status:"success", message:"producto creado"});
});

router.put("/:pid", (req,res)=>{
    var idProduct = req.params.pid;
    const product = req.body;
    var pm = new ProductManager("./productos.json");
    pm.updateProduct(idProduct, product);
    res.send({status:"success", message:"producto actualizado"});
})

router.delete("/:pid", (req,res)=>{
    var idProduct = req.params.pid;
    var pm = new ProductManager("./productos.json");
    pm.deleteProduct(idProduct);
    res.send({status:"success", message:"producto eliminado"});
})


export default router;