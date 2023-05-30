import cartsModel from "../models/carts.js";

export default class cartsMongoManager{

    getCarts = () =>{
        return cartsModel.find().lean().populate("products.product");
    }
    getCartsBy = (params) =>{
        return cartsModel.findOne(params).lean().populate("products.product");
    }
    createCarts = (carts) =>{
        return cartsModel.create(carts);
    }
    deleteCarts = (id) => {
        return cartsModel.findByIdAndDelete(id);
    }
    addProductToCart = async (cid, pid) =>{
        const cart = await cartsModel.findOne({_id: cid})
        let productIndex = -1;
        if (cart.products){
            productIndex = cart.products.findIndex(p => p.product._id == pid);            
        }
        else {
            cart.products = []
        }

        if(productIndex==-1) {
            cart.products.push({product:pid, quantity:1})
        }
        else {
           cart.products[productIndex] = {product:pid, quantity: cart.products[productIndex].quantity+1}
        }
        return cartsModel.findByIdAndUpdate(cid,{products: cart.products})
    }
    deleteProductFromCart = async (cid, pid) =>{
        const cart = await cartsModel.findOne({_id: cid})
        let productIndex = -1;
        if (cart.products){
            productIndex = cart.products.findIndex(p => p.product._id == pid);            
        }
        else {
            cart.products = []
        }
        if(productIndex>-1) {
            cart.products.splice(productIndex, 1);
        }
        return cartsModel.findByIdAndUpdate(cid,{products: cart.products})
    }
    deleteProductsFromCart = async(cid) =>{
        const cart = await cartsModel.findOne({_id: cid})
        cart.products = []
        return cartsModel.findByIdAndUpdate(cid,{products: cart.products})
    }
    updateQuantityFromProduct = async(cid,pid,quantity) =>{
        const cart = await cartsModel.findOne({_id: cid})
        let productIndex = -1;
        
        if (cart.products){
            productIndex = cart.products.findIndex(p => p.product._id === pid);    
            console.log(pid)        
        }
        else {
            cart.products = []
        }

        if(productIndex>-1) {
            cart.products[productIndex] = {product:pid, quantity: quantity}
        }   
        console.log(cart.products)
        return cartsModel.findByIdAndUpdate(cid,{products: cart.products})
    }
    updateProductsFromCart = async(cid,products) =>{
        const cart = await cartsModel.findOne({_id: cid})
        cart.products = products
        return cartsModel.findByIdAndUpdate(cid,{products: cart.products});
    }
}
