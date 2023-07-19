export default class CartsService{
    constructor(dao){
        this.dao = dao;
    }

    getCarts = () =>{
        return this.dao.getCarts();
    }
    getCartsBy = (params) =>{
        return this.dao.getCartsBy(params);
    }
    createCarts = (carts) =>{
        return this.dao.createCarts(carts);
    }
    deleteCarts = (id) => {
        return this.dao.deleteCarts(id);
    }
    addProductToCart = async (cid, pid) =>{
        return this.dao.addProductToCart(cid, pid)
    }
    deleteProductFromCart = async (cid, pid) =>{
        return this.dao.deleteProductFromCart(cid, pid)
    }
    deleteProductsFromCart = async(cid) =>{
        return this.dao.deleteProductFromCart(cid)
    }
    updateQuantityFromProduct = async(cid,pid,quantity) =>{
        return this.dao.updateQuantityFromProduct(cid,pid,quantity)
    }
    updateProductsFromCart = async(cid,products) =>{
        return this.dao.updateProductsFromCart(cid, products)
    }
}