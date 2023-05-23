import cartsModel from "../models/carts.js";

export default class cartsMongoManager{

    getCarts = () =>{
        return cartsModel.find().lean();
    }
    getCartsBy = (params) =>{
        return cartsModel.findOne(params).lean();
    }
    createCarts = (carts) =>{
        return cartsModel.create(carts);
    }
    deleteCarts = (id) => {
        return cartsModel.findByIdAndDelete(id)
    }
    addProductToCart = async (cid, pid) =>{
        const cart = await cartsModel.findOne({_id: cid})
        let productIndex = -1;
        if (cart.products){
            productIndex = cart.products.findIndex(p => p.product_id == pid);            
        }
        else {
            cart.products = []
        }

        if(productIndex==-1) {
            cart.products.push({product_id:pid, quantity:1})
        }
        else {
           cart.products[productIndex] = {product_id:pid, quantity: cart.products[productIndex].quantity+1}
        }
        return cartsModel.findByIdAndUpdate(cid,{products: cart.products})
    }
}
