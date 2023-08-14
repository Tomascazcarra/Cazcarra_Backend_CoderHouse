import { Router } from "express";
import ProductsController from "../../controllers/product-controller.js";
import { allowAdmin, allowRoles } from "../../middlewares/auth.js";

const router = Router();
const productsController = new ProductsController;

router.get("/", productsController.getProducts)

router.get("/mockingproducts", productsController.createMockProducts)

router.post("/", allowAdmin, productsController.createProducts)

router.get("/:pid", productsController.getProductsBy)

router.put("/:pid", allowAdmin, productsController.updateProducts)

router.delete("/:pid", allowAdmin, productsController.deleteProducts)

export default router;
