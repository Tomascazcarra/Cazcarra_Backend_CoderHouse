import { Router } from "express";
import passport from "passport";
import { passportCall } from "../../middlewares/auth.js"

const router = Router();

router.get("/github", passportCall("github"),(req,res)=>{

})

router.get("/githubcallback", passportCall("github"), (req,res)=>{
    const user = req.user;
    req.session.user = {
        id: user.id,
        name: user.first_name,
        role: user.role,
        email:user.email
    }
    res.send({status:"success", message:"Logueado con GITHUB"})
})

router.post("/register", passportCall("register"), async(req, res)=>{
    res.send({status:"success", message:"registered"})
})

router.post("/login",passportCall("login"), async(req, res)=>{
    req.session.user = {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        id: req.user.id
    }
    return res.send({status:"success"});
})

router.get("/current", async (req, res)=>{
    res.send({status:"success", message: req.user})
})

export default router;