import { Router } from "express";
import ProductsController from "../../controllers/product-controller.js";
import { allowRoles } from "../../middlewares/auth.js";

const router = Router();
const productsController = new ProductsController;

router.get("/", productsController.getProducts)

router.get("/mockingproducts", productsController.createMockProducts)

router.post("/", allowRoles(["admin", "premium"]), productsController.createProducts)

router.get("/:pid", productsController.getProductsBy)

router.put("/:pid", allowRoles(["admin", "premium"]), productsController.updateProducts)

router.delete("/:pid", allowRoles(["admin", "premium"]), productsController.deleteProducts)

export default router;
