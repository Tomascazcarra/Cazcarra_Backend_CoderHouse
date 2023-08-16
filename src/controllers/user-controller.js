import { userService } from "../services/repositories.js"


export default class UserController{

    changeRole = async (req, res) =>{
        const {userId} = req.params;
        const user = await userService.getUserBy(userId);
        if(user.role == "user"){
            user.role = "premium"
        }
        else if(user.role == "premium"){
            user.role = "user"
        }
        await userService.updateUser(user._id, {role:user.role})
        res.send({status:"success", message:"Usuario actualizado correctamente"})
    }
}

