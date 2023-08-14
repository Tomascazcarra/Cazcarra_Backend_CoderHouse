import { Router } from "express";
import { privacy } from "../middlewares/auth.js";
import ViewsController from "../controllers/views-controller.js";
import { allowUsers } from "../middlewares/auth.js";

const viewsController = new ViewsController();
const router = Router();

router.get("/products", privacy("PRIVATE"), viewsController.getProducts);

router.get("/realtimeproducts", viewsController.realTimeProducts);

router.get("/chat", allowUsers, viewsController.chat)

router.get("/carts", viewsController.getCarts)

router.get("/carts/:cid", viewsController.getCartsBy)

router.get("/register", privacy("NO_AUTHENTICATED"), viewsController.register)

router.get("/login", privacy("NO_AUTHENTICATED"), viewsController.login)

router.post("/logout", privacy("PRIVATE"), viewsController.logout)

router.get("/", privacy("NO_AUTHENTICATED"), viewsController.loginRedirect)

router.get("/restorerequest", privacy("NO_AUTHENTICATED"), viewsController.restoreRequest)

export default router;