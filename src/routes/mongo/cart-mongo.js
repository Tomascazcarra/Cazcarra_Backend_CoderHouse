import { Router } from "express";
import CartsController from "../../controllers/cart-controller.js";
import { allowUsers } from "../../middlewares/auth.js";

const router = Router();
const cartsController = new CartsController()

router.get("/", cartsController.getCarts);

router.post("/", cartsController.createCart);

router.get("/:cid", cartsController.getCartsBy);

router.post("/:cid/product/:pid", allowUsers, cartsController.addProductToCart);

router.delete("/:cid/products/:pid", allowUsers, cartsController.deleteProductToCart);

router.put("/:cid", allowUsers,cartsController.updateProductsFromCart);

router.put("/:cid/products/:pid", allowUsers, cartsController.updateQuantityFromProduct);

router.delete("/:cid", allowUsers, cartsController.deleteProductsFromCart);

router.post("/:cid/purchase", cartsController.purchase);


export default router;
