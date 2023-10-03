import { Router } from "express";
import UserController from "../../controllers/user-controller.js";
import uploader from "../../services/uploader.js";


const router = Router();
const userController = new UserController()

router.put("/premium/:uid", userController.changeRole);
router.post("/:uid/documents",uploader.array("files"),userController.documentUpload);
router.get("/", userController.getUsers);
router.delete("/",userController.deleteInactiveUsers);
router.delete("/:uid",userController.deleteUser);
export default router;
