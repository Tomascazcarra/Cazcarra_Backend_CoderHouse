import { Router } from "express";
import passport from "passport";
import { passportCall } from "../../middlewares/auth.js"
import SessionsController from "../../controllers/sessions-controller.js";

const sessionsController = new SessionsController();
const router = Router();

router.get("/github", passportCall("github"),(req,res)=>{
})

router.get("/githubcallback", passportCall("github"), sessionsController.gitHubCallBack)

router.post("/register", passportCall("register"), sessionsController.register)

router.post("/login",passportCall("login"), sessionsController.login)

router.get("/current", sessionsController.current)

router.post("/restoreRequest", sessionsController.restoreRequest)

router.post("/restorePassword", sessionsController.restorePassword)

export default router;