import { cartService, productService, ticketService } from "../services/repositories.js";
import crypto from "crypto";


export default class CartsController{
    
    getCarts = async (req, res) =>{
        const carts = await cartService.getCarts();
        res.send({status:"success", payload:carts})
    }
    
    createCart = async (req, res) =>{
        const cart = {"products":[]};
        const result = await cartService.createCarts(cart);
        req.logger.debug("Carrito creado correctamente")
        res.sendStatus(201);
    }

    getCartsBy = async (req, res) =>{
        const {cid} = req.params;
        const carts = await cartService.getCartsBy({_id: cid});
        if(!carts) res.status(404).send({status:"error", error: "carrito no encontrado"})
        res.send({status:"success", payload:carts})
    }

    addProductToCart = async (req, res) =>{
        let cid = req.params.cid;
        let pid = req.params.pid;
        const product = await productService.getProductsBy({_id:pid})
        if(req.user.role == "premium" && req.user.email == product.owner){
            return res.status(405).send({status:"error", error: "No se puede agregar un producto que usted creo"})
        }
        const result = await cartService.addProductToCart(cid, pid)
        req.logger.debug("Producto añadido al carrito correctamente")
        res.send({status:"success", message:"producto agregado al carrito"});
    }
    
    deleteProductToCart = async (req, res) =>{
        let cid = req.params.cid;
        let pid = req.params.pid;
        const result = await cartService.deleteProductFromCart(cid, pid)
        req.logger.debug("Producto eliminado del carrito correctamente")
        res.send({status:"success"})
    }

    updateProductsFromCart = async (req, res) =>{
        let cid = req.params.cid;
        const {products} = req.body;
        const result = await cartService.updateProductsFromCart(cid, products)
        res.send({status: "success"})
    }

    updateQuantityFromProduct = async (req, res) =>{
        let cid = req.params.cid;
        let pid = req.params.pid;
        const {quantity} = req.body;
        const result = await cartService.updateQuantityFromProduct(cid, pid, quantity)
        res.send({status: "success"})
    }

    deleteProductsFromCart = async (req, res) => {
        let cid = req.params.cid;
        const result = await cartService.deleteProductsFromCart(cid)
        res.send({status: "success"})
    }

    purchase = async(req, res, next) =>{
        
        let amount = 0;
        let productosNoComprados = []
        let cid = req.params.cid;
        const carts = await cartService.getCartsBy({_id: cid});
        for(let i = 0; i < carts.products.length; i++){
            let product = carts.products[i]["product"]
            if(product.stock >= carts.products[i].quantity){
                amount += carts.products[i].quantity*product.price
                product.stock -= carts.products[i].quantity
                await productService.updateProducts(product._id, product)
                carts.products.splice(i,1)
            }
            else{
                productosNoComprados.push(product._id)
            }
        }
        await cartService.updateProductsFromCart(cid, carts.products)

        const currentDateTime = new Date();
        const currentDate = currentDateTime.toISOString().slice(0, 10);
        const currentHour = currentDateTime.getHours();
        const currentMinutes = currentDateTime.getMinutes();
        const currentDateTimeString = `${currentDate} ${currentHour}:${currentMinutes}`;

        let code = crypto.randomBytes(16).toString("hex")
        let ticketInfo = {code:code, purchaseDateTime:currentDateTimeString, amount:amount, purchaser:req.user.email}
        let ticket = ticketService.createTickets(ticketInfo)

        if(productosNoComprados.length > 0){
            res.send({status: "success", message: `Productos no comprados: ${productosNoComprados}`})
        }
        else{
            res.send({status: "success"})
        }

    }
}