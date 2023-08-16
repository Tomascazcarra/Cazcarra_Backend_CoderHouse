import { Router } from "express";
import CartsController from "../../controllers/cart-controller.js";
import { allowRoles } from "../../middlewares/auth.js";

const router = Router();
const cartsController = new CartsController()

router.get("/", cartsController.getCarts);

router.post("/", cartsController.createCart);

router.get("/:cid", cartsController.getCartsBy);

router.post("/:cid/product/:pid", allowRoles(["premium", "user"]), cartsController.addProductToCart);

router.delete("/:cid/products/:pid", allowRoles(["premium", "user"]), cartsController.deleteProductToCart);

router.put("/:cid", allowRoles(["premium", "user"]),cartsController.updateProductsFromCart);

router.put("/:cid/products/:pid", allowRoles(["premium", "user"]), cartsController.updateQuantityFromProduct);

router.delete("/:cid", allowRoles(["premium", "user"]), cartsController.deleteProductsFromCart);

router.post("/:cid/purchase", cartsController.purchase);


export default router;
