import { userService } from "../services/repositories.js"
import uploader from "../services/uploader.js";
import GetUserDTO from "../dto/user/GetUserDTO.js"
import MailingService from "../services/repositories/mailing-services.js";
import DTemplates from "../constants/DTemplates.js";

export default class UserController {

    changeRole = async (req, res) => {
        const { uid } = req.params;
        const user = await userService.getUserBy({ _id: uid });
        const cargoDni = user.documents.some((obj) => obj.name === "DNI");
        const cargoDomicilio = user.documents.some((obj) => obj.name === "Comprobante de domicilio");
        const cargoEstado = user.documents.some((obj) => obj.name === "Comprobante de estado");
        if ((!cargoDni || !cargoDomicilio || !cargoEstado) && user.role == "user") {
            return res.status(400).send({ status: "error", error: "No se puede actualizar el usuario a premium porque faltan documentos" })
        }
        if (user.role == "user") {
            user.role = "premium"
        }
        else if (user.role == "premium") {
            user.role = "user"
        }
        await userService.updateUser(user._id, { role: user.role })
        res.send({ status: "success", message: "Usuario actualizado correctamente" })
    }

    documentUpload = async (req, res) => {
        const { uid } = req.params;
        const user = await userService.getUserBy({ _id: uid });
        const filetype = req.body.filetype;
        const documentName = req.body.documentName;
        const files = req.files.map((obj) => obj.path);
        if (filetype == "document" && documentName != null) {
            for (let f of files) {
                console.log(f)
                user.documents.push({ name: documentName, reference: f })
            }
            await userService.updateUser(uid, user)
        }
        res.send({ status: "success", message: "datos cargados correctamente" })
    }

    updateUserLastActivity = async (user) => {
        const currentDateTime = new Date();
        const currentDate = currentDateTime.toISOString().slice(0, 10);
        const currentHour = currentDateTime.getHours();
        const currentMinutes = currentDateTime.getMinutes();
        const currentDateTimeString = `${currentDate} ${currentHour}:${currentMinutes}`;
        user.lastActivity = currentDateTimeString;
        await userService.updateUser(user.id, user);
    }


    getUsers = async (req, res) => {
        const users = await userService.getUser();
        const usersDTO = users.map((user) => new GetUserDTO(user));
        res.send({ status: "success", message: usersDTO })
    }

    deleteInactiveUsers = async (req, res) => {
        const users = await userService.getUser();
        const currentDateTime = new Date();
        for (const user of users) {
            const lastActivityDate = new Date(user.lastActivity.replace(' ', 'T'));
            let difference = currentDateTime - lastActivityDate;
            difference = difference/(1000*60*60*24)
            if (difference >= 2) {
                const mailingService = new MailingService();
                const result = await mailingService.sendMail(user.email,DTemplates.DELETEUSER)
                await userService.deleteUser(user.id)
            }
        };
        res.send({ status: "success", message: "usuarios inactivos eliminados"})
    }
}


