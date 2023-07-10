import { Router } from "express";
import CartsController from "../../controllers/cart-controller.js";

const router = Router();
const cartsController = new CartsController()

router.get("/", cartsController.getCarts);

router.post("/", cartsController.createCart);

router.get("/:cid", cartsController.getCartsBy);

router.post("/:cid/product/:pid", cartsController.addProductToCart);

router.delete("/:cid/products/:pid", cartsController.deleteProductToCart);

router.put("/:cid", cartsController.updateProductsFromCart)

router.put("/:cid/products/:pid", cartsController.updateQuantityFromProduct) 

router.delete("/:cid", cartsController.deleteProductsFromCart);


export default router;
