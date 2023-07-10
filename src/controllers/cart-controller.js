import CartsService from "../services/cart-services.js"
import cartsManager from "../dao/mongo/managers/carts-manager.js"

const manager = new cartsManager()
const cartsService = new CartsService(manager)

export default class CartsController{
    
    getCarts = async (req, res) =>{
        const carts = await cartsService.getCarts();
        res.send({status:"success", payload:carts})
    }
    
    createCart = async (req, res) =>{
        const cart = {"products":[]};
        const result = await cartsService.createCarts(cart);
        res.sendStatus(201);
    }

    getCartsBy = async (req, res) =>{
        const {cid} = req.params;
        const carts = await cartsService.getCartsBy({_id: cid});
        if(!carts) res.status(404).send({status:"error", error: "carrito no encontrado"})
        res.send({status:"success", payload:carts})
    }

    addProductToCart = async (req, res) =>{
        let cid = req.params.cid;
        let pid = req.params.pid;
        const result = await cartsService.addProductToCart(cid, pid)
        res.send({status:"success", message:"producto agregado al carrito"});
    }
    
    deleteProductToCart = async (req, res) =>{
        let cid = req.params.cid;
        let pid = req.params.pid;
        const result = await cartsService.deleteProductFromCart(cid, pid)
        res.send({status:"success"})
    }

    updateProductsFromCart = async (req, res) =>{
        let cid = req.params.cid;
        const {products} = req.body;
        const result = await cartsService.updateProductsFromCart(cid, products)
        res.send({status: "success"})
    }

    updateQuantityFromProduct = async (req, res) =>{
        let cid = req.params.cid;
        let pid = req.params.pid;
        const {quantity} = req.body;
        const result = await cartsService.updateQuantityFromProduct(cid, pid, quantity)
        res.send({status: "success"})
    }

    deleteProductsFromCart = async (req, res) => {
        let cid = req.params.cid;
        const result = await cartsService.deleteProductsFromCart(cid)
        res.send({status: "success"})
    }

    renderGetCartsBy = async (req, res) =>{
        let cid = req.params.cid
        const carts = await cartsService.getCartsBy({_id: cid});
        const result = carts["products"]
        res.render("cart", {result})
    }
    
    renderGetCarts = async (req, res) =>{
        const carts = await cartsService.getCarts();
        res.render("carts", {carts})
    }

}