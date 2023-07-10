import { Router } from "express";
import ProductsController from "../../controllers/product-controller.js";

const router = Router();
const productsController = new ProductsController;

router.get("/", productsController.getProducts)

router.post("/", productsController.createProducts)

router.get("/:pid", productsController.getProductsBy)

router.put("/:pid", productsController.updateProducts)

router.delete("/:pid", productsController.deleteProducts)

export default router;
