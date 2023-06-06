import { Router } from "express";
import productsMongoManager from "../dao/mongo/managers/products-manager.js";
import cartsMongoManager from "../dao/mongo/managers/carts-manager.js";
import productsModel from "../dao/mongo/models/products.js";
import { privacy } from "../middlewares/auth.js";


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

router.get("/products", privacy("PRIVATE"), async(req, res)=>{
    const {page = 1} = req.query;
    const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest} = await productsModel.paginate({},{ page, limit: 2, lean: true})
    const products = docs;
    res.render("productsmongo",{products, hasPrevPage, hasNextPage, prevPage, nextPage, page:rest.page, user:req.session.user})
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

router.get("/register", privacy("NO_AUTHENTICATED"), (req, res)=>{
    res.render("register")
})

router.get("/login", privacy("NO_AUTHENTICATED"), (req, res)=>{
    res.render("login")
})

router.post("/logout", privacy("PRIVATE"), (req, res)=>{
    req.session.destroy();
    return res.send({status:"success"});
})
router.get("/", privacy("NO_AUTHENTICATED"), (req, res)=>{
    res.redirect("login")
})

export default router;