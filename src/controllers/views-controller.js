import productsModel from "../dao/mongo/models/products.js"
import { cartService } from "../services/repositories.js"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

export default class ViewsController{

    chat = async (req, res) =>{
        res.render("Chat")
    }

    register = async(req, res) =>{
        res.render("register")
    }

    login = async(req, res) =>{
        res.render("login")
    }

    logout = async(req, res) =>{
        req.session.destroy();
        return res.send({status:"success"});
    }

    loginRedirect = async(req, res) =>{
        res.redirect("login")
    }

    realTimeProducts = async (req, res) =>{
        res.render("realTimeProducts");
    }

    getProducts = async (req, res) =>{
        const {page = 1} = req.query;
        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest} = await productsModel.paginate({},{ page, limit: 2, lean: true})
        const products = docs;
        res.render("productsmongo",{products, hasPrevPage, hasNextPage, prevPage, nextPage, page:rest.page, user:req.session.user})
    }

    getCartsBy = async (req, res) =>{
        let cid = req.params.cid
        const carts = await cartService.getCartsBy({_id: cid});
        const result = carts["products"]
        res.render("cart", {result})
    }
    
    getCarts = async (req, res) =>{
        const carts = await cartService.getCarts();
        res.render("carts", {carts})
    }

    restoreRequest = async (req, res) =>{
        res.render("restoreRequest")
    }

    restorePassword = async (req, res) => {
        const {token} = req.query;
        try{
            const validToken = jwt.verify(token, config.jwt.SECRET)
            res.render("restorepassword")
        }catch{
            return res.render("invalidToken")
        }
    }
}