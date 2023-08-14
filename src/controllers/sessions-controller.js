import EErrors from "../constants/EErrors.js";
import { sessionErrorIncompleteValues } from "../constants/session-error.js";
import UserCurrentDTO from "../dto/user/UserCurrentDTO.js";
import ErrorService from "../services/error.services.js";


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
        console.log(req.session.user)
        const {email,password} = req.session.user;

        if(!email||!password){
            ErrorService.createError({
                name:"Login error",
                cause:sessionErrorIncompleteValues({email,password}),
                code: EErrors.INCOMPLETE_VALUES
            })
        req.session.user = {
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            id: req.user.id
        }
        req.logger.debug(req.session.user)
        return res.send({status:"success"});
        }
    }

    current = async (req, res) =>{
        res.send({status:"success", message: new UserCurrentDTO(req.user)})
    }

    restoreRequest = async (req, res) =>{
        const {email} = req.body;
        if(!email) return res.error("faltan datos")
        const restoreToken = generateToken()
    }
}