import { Router } from "express";
import productsMongoManager from "../dao/mongo/managers/products-manager.js";
import cartsMongoManager from "../dao/mongo/managers/carts-manager.js";
import productsModel from "../dao/mongo/models/products.js";

const router = Router();
const productsService = new productsMongoManager();
const cartsService = new cartsMongoManager()
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

router.get("/products", async(req, res)=>{
    const {page = 1} = req.query;
    const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest} = await productsModel.paginate({},{ page, limit: 2, lean: true})
    const products = docs;
    res.render("productsmongo",{products, hasPrevPage, hasNextPage, prevPage, nextPage, page:rest.page})
});


router.get("/realtimeproducts", (req, res)=>{
    res.render("realTimeProducts");
});

router.get("/chat" , (req, res)=>{
    res.render("Chat")
})

router.get("/carts" , async (req, res)=>{
    const carts = await cartsService.getCarts();
    res.render("carts", {carts})
})

router.get("/carts/:cid" , async (req, res)=>{
    let cid = req.params.cid
    const carts = await cartsService.getCartsBy({_id: cid});
    const result = carts["products"]
    res.render("cart", {result})
})

export default router;