import { Router } from "express";
import userModel from "../../dao/mongo/models/user.js";
import { validatedPassword } from "../../utils.js";
import { createHash } from "../../utils.js";

const router = Router();

router.post("/register", async(req, res)=>{
    const{first_name, last_name, email, password} = req.body;
    const exists = await userModel.findOne({email});
    if (exists) return res.status(400).send({status:"error", error:"El usuario ya existe"})
    const hashedPassword = await createHash(password);
    const user = {
        first_name,
        last_name,
        email,
        password: hashedPassword
    }
    const result = await userModel.create(user);
    res.send({status:"success", payload:result})
})
router.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email})

    if(email === "adminCoder@coder.com" && password==="adminCod3r123"){
        req.session.user ={
            name: `Admin`,
            role: "admin",
            email: "..."
        }
        return res.send({status:"success"});
    }

    if(!user) return res.status(400).send({status:"error", error:"usuario no encontrado"})
    const isValidPassword = await validatedPassword(password, user.password)
    if(!isValidPassword) return res.status(400).send({status: "error", error:"contraseña incorrecta"})
    
    
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role
    }
    return res.send({status:"success"});
})

export default router;