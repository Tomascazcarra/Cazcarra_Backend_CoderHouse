import fs from "fs"

export default class CartManager {
    constructor(path) {
        this.path = path;
    };

    getCarts = async() =>{
        if(fs.existsSync(this.path)){
            let data = await fs.promises.readFile(this.path, "utf-8")
            let carts = JSON.parse(data)
            return carts 
        }
        return [];
    }

    generateId = async() => {
        let carts = await this.getCarts()
        if (carts.length == 0) {
            return 1
        };
        return carts[carts.length - 1].id + 1;
    };
    
    addCart = async(products) => {
        let carts = await this.getCarts()
        const newCart = {
            id: await this.generateId(),
            products: products
        };
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
    };

    getProductsFromCart = async(cid) => {
        let carts = await this.getCarts();
        let cart = carts.find(c => c.id == cid);
        if(!cart) {
            return null 
        }
        else {
            return cart.products
        }
    };

    addProductToCart = async(cid, pid) => {
        let carts = await this.getCarts();
        let cartIndex = carts.findIndex(c => c.id == cid);
        let products = await this.getProductsFromCart(cid);
        let productIndex = products.findIndex(p => p.product == pid);
        
        if(productIndex==-1) {
            carts[cartIndex].products.push({product:pid, quantity:1})
        }
        else {
           carts[cartIndex].products[productIndex] = {product:pid, quantity: carts[cartIndex].products[productIndex].quantity+1}
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
    };
};