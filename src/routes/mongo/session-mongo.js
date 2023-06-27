import { Router } from "express";
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

router.post("/register", passportCall("register",{failureRedirect:"/api/session/registerFail"}), async(req, res)=>{
    res.send({status:"success", message:"registered"})
})

router.get("registerFail",(req,res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error", error: req.session.messages})
})

router.post("/login", passportCall("login"), async(req, res)=>{
    req.session.user = {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        id: req.user.id
    }
    return res.send({status:"success"});
})

router.get("/current", async (req, res)=>{
    res.send({status:"success", message: req.session.user})
})

export default router;