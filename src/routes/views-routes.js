import { Router } from "express";
import { privacy } from "../middlewares/auth.js";
import CartsController from "../controllers/cart-controller.js";
import ProductsController from "../controllers/product-controller.js";

const productsController = new ProductsController();
const cartsController = new CartsController();
const router = Router();

router.get("/products", privacy("PRIVATE"), productsController.renderGetProducts);

router.get("/realtimeproducts", productsController.renderRealTimeProducts);

router.get("/chat" , (req, res)=>{
    res.render("Chat")
})

router.get("/carts", cartsController.renderGetCarts)

router.get("/carts/:cid", cartsController.renderGetCartsBy)

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