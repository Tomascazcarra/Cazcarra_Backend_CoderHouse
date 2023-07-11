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
        res.send({status:"success", message:"registered"})
    }

    login = async (req, res) =>{
        req.session.user = {
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            id: req.user.id
        }
        return res.send({status:"success"});
    }

    current = async (req, res) =>{
        res.send({status:"success", message: req.user})
    }

}