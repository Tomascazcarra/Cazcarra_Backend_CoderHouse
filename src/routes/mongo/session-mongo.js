import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/github", passport.authenticate("github"),(req,res)=>{

})

router.get("/githubcallback", passport.authenticate("github"), (req,res)=>{
    const user = req.user;
    req.session.user = {
        id: user.id,
        name: user.first_name,
        role: user.role,
        email:user.email
    }
    res.send({status:"success", message:"Logueado con GITHUB"})
})


router.post("/register", passport.authenticate("register",{failureRedirect:"/api/session/registerFail"}), async(req, res)=>{
    res.send({status:"success", message:"registered"})
})

router.get("registerFail",(req,res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error", error: req.session.messages})
})

router.post("/login",passport.authenticate("login",{failureRedirect:"/api/session/loginFail"}), async(req, res)=>{
    req.session.user = {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        id: req.user.id
    }
    return res.send({status:"success"});
})
router.get("loginFail",(req,res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error", error: req.session.messages})
})

export default router;