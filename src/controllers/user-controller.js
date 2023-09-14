import { userService } from "../services/repositories.js"
import uploader from "../services/uploader.js";

export default class UserController{

    changeRole = async (req, res) =>{
        const {uid} = req.params;
        const user = await userService.getUserBy({_id:uid});
        const cargoDni = user.documents.some((obj) => obj.name === "DNI");
        const cargoDomicilio = user.documents.some((obj) => obj.name === "Comprobante de domicilio");
        const cargoEstado = user.documents.some((obj) => obj.name === "Comprobante de estado");
        if((!cargoDni || !cargoDomicilio || !cargoEstado) && user.role == "user"){
            return res.status(400).send({status:"error", error: "No se puede actualizar el usuario a premium porque faltan documentos"})
        }
        if(user.role == "user"){
            user.role = "premium"
        }
        else if(user.role == "premium"){
            user.role = "user"
        }
        await userService.updateUser(user._id, {role:user.role})
        res.send({status:"success", message:"Usuario actualizado correctamente"})
    }

    documentUpload = async (req, res) =>{
        const {uid} = req.params;
        const user = await userService.getUserBy({_id:uid});
        const filetype = req.body.filetype;
        const documentName = req.body.documentName;
        const files = req.files.map((obj) => obj.path);
        if(filetype == "document" && documentName != null){
            for (let f of files) {
                console.log(f)
                user.documents.push({name: documentName, reference:f})
            }
            await userService.updateUser(uid, user)
        }
        res.send({status:"success", message:"datos cargados correctamente"})
    }
}

