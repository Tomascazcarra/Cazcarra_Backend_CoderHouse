import fs from "fs"

export default class CartManager {
    constructor(path) {
        this.path = path;
    };

    getCarts() {
        if(fs.existsSync(this.path)){
            var carts = fs.readFileSync(this.path, "utf-8")
            carts = JSON.parse(carts)
        }
        else{ 
            carts = []
        }
        return carts;
    }

    generateId() {
        var carts = this.getCarts()
        if (carts.length == 0) {
            return 1
        };
        return carts[carts.length - 1].id + 1;
    };
    
    addCart(products) {
        var carts = this.getCarts()
        const newCart = {
            id: this.generateId(),
            products: products
        };
        carts.push(newCart);
        fs.writeFileSync(this.path, JSON.stringify(carts))
    };

    getProductsFromCart(cid) {
        var carts = this.getCarts();
        var cart = carts.find(c => c.id == cid);
        if(!cart) {
            return null 
        }
        else {
            return cart.products
        }
    };

    addProductToCart(cid, pid) {
        var carts = this.getCarts();
        var cartIndex = carts.findIndex(c => c.id == cid);
        var products = this.getProductsFromCart(cid);
        var productIndex = products.findIndex(p => p.product == pid);
        if(productIndex==-1) {
            carts[cartIndex].products.push({product:pid, quantity:1})
        }
        else {
           carts[cartIndex].products[productIndex] = {product:pid, quantity: carts[cartIndex].products[productIndex].quantity+1}
        }
        fs.writeFileSync(this.path, JSON.stringify(carts))
    };
};