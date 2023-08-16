import UserCurrentDTO from "../dto/user/UserCurrentDTO.js";
import { generateToken, createHash, validatePassword  } from "../middlewares/auth.js";
import { userService } from "../services/repositories.js";
import RestoreTokenDTO from "../dto/user/RestoreTokenDTO.js"
import MailingService from "../services/repositories/mailing-services.js";
import jwt  from "jsonwebtoken";


export default class SessionsController{

    gitHubCallBack = async (req, res) =>{
        const user = req.user;
        req.session.user = {
            id: user.id,
            name: user.first_name,
            role: user.role,
            email:user.email
        }
        res.send({status:"success", message:"Logueado con GITHUB"})
    }

    register = async (req, res) =>{
        req.logger.debug("Se registro el usuario correctamente")
        res.send({status:"success", message:"registered"})
    }

    login = (req, res) =>{
        req.session.user = {
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            id: req.user.id
        }
        req.logger.debug(req.session.user)
        return res.send({status:"success"});
    }

    current = async (req, res) =>{
        res.send({status:"success", message: new UserCurrentDTO(req.user)})
    }

    restoreRequest = async (req, res) =>{
        const {email} = req.body;
        if(!email) return res.error("faltan datos");
        const user = await userService.getBy({email});
        if(!user) return res.error("Email no valido");
        const restoreToken = generateToken(RestoreTokenDTO.getFrom(user), "1h");
        const mailingService = new MailingService();
        const result = await mailingService.sendMail(user.email,DTemplates.RESTORE,{restoreToken})
        console.log(result)
        res.sendSuccess("Correo enviado")
    }

    restorePassword = async (req, res) =>{
        const {password, token} = req.body;
        try{
            const tokenUser = jwt.verify(token, config.jwt.SECRET)
            const user = await userService.getBy({email: tokenUser.email})
            const isSamePassword = await validatePassword(password, user.password)
            if(isSamePassword) return res.send("Su contraseña es igual a la anterior")
            const newHashedPassword = await createHash(password);
            await userService.updateUser(user._id,{password:newHashedPassword})
            res.sendSuccess("Contraseña actualizada")
        }catch(error){
            console.log(error)
        }
        res.sendStatus(200);
    }
}