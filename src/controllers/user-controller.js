import { userService } from "../services/repositories.js"


export default class UserController{

    changeRole = async (req, res) =>{
        const userId = req.uid;
        const user = userService.getUserBy(userId);
        if(user.role == "user"){
            user.role = "premium"
        }
        else if(user.role == "premium"){
            user.role = "user"
        }
        userService.updateUser(userId, user)
        res.send({status:"success", message:"Usuario actualizado correctamente"})
    }
}

