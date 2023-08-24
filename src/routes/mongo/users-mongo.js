import { Router } from "express";
import UserController from "../../controllers/user-controller.js";


const router = Router();
const userController = new UserController()

router.put("/premium/:uid", userController.changeRole)
export default router;