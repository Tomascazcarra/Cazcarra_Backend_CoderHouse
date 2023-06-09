import fs from "fs"

export default class ProductManager {
    constructor(path) {
        this.path = path;
    };

    generateId = async() => {
        let productos = await this.getProducts()
        if (productos.length == 0) {
            return 1
        };
        return productos[productos.length - 1].id + 1;
    };

    getProducts = async() =>{
        if(fs.existsSync(this.path)){
            let data = await fs.promises.readFile(this.path, "utf-8")
            let productos = JSON.parse(data)
            return productos
        }
        return [];
    };

    createProducts = async(product)  => {
        let productos = await this.getProducts()
        if (productos.some(p => p.code === product.code)) {
            throw new Error("El código del producto ya existe.");
        };
        const newProduct = {
            id: await this.generateId(),
            ...product
        };
        productos.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
    };

    getProductById = async(id) => {
        let productos = await this.getProducts();
        const product = productos.find(p => p.id == id);
        return product;
    }
    
    updateProducts = async(id, producto) => {
        let productos = await this.getProducts()
        const index = productos.findIndex(p => p.id == id);
        if (index == -1) {
            throw new Error("Producto no encontrado.");
        }
        else {
            const productToUpdate = productos[index]
            for(let attribute in producto){
                productToUpdate[attribute] = producto[attribute];
            }
            productos[index] = productToUpdate
            await fs.promises.writeFile(this.path, JSON.stringify(productos))
        }
    }

    deleteProducts = async(id) => {
        let productos = await this.getProducts();
        const product = productos.find(p => p.id == id);
        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        else {
            productos = productos.filter(producto => producto.id != product.id)
            await fs.promises.writeFile(this.path, JSON.stringify(productos))
        }
    }
};

/*
let filepath = "productos.json";
let pm = new ProductManager(filepath);
const producto1 = {title:"producto prueba1", description:"este es un producto prueba", price:200, thumbnail:"Sin imagen", code:"abc1", stock:25}
pm.addProduct(producto1);
const producto2 = {title:"producto prueba2", description:"este es un producto prueba", price:550, thumbnail:"Sin imagen", code:"abc12", stock:1}
pm.addProduct(producto2);
const producto3 = {title:"producto prueba3", description:"este es un producto prueba", price:100, thumbnail:"Sin imagen", code:"abc13", stock:55}
pm.addProduct(producto3);
const producto4 = {title:"producto prueba4", description:"este es un producto prueba", price:1000, thumbnail:"Sin imagen", code:"abc4", stock:5}
pm.addProduct(producto4);
const producto5 = {title:"producto prueba5", description:"este es un producto prueba", price:1500, thumbnail:"Sin imagen", code:"abc5", stock:545}
pm.addProduct(producto5);
const producto6 = {title:"producto prueba6", description:"este es un producto prueba", price:2000, thumbnail:"Sin imagen", code:"abc6", stock:22}
pm.addProduct(producto6);
const producto7 = {title:"producto prueba7", description:"este es un producto prueba", price:250, thumbnail:"Sin imagen", code:"abc7", stock:19}
pm.addProduct(producto7);
const producto8 = {title:"producto prueba8", description:"este es un producto prueba", price:370, thumbnail:"Sin imagen", code:"abc8", stock:15}
pm.addProduct(producto8);
const producto9 = {title:"producto prueba9", description:"este es un producto prueba", price:210, thumbnail:"Sin imagen", code:"abc9", stock:2}
pm.addProduct(producto9);
const producto10 = {title:"producto prueba10", description:"este es un producto prueba", price:2150, thumbnail:"Sin imagen", code:"abc10", stock:34}
pm.addProduct(producto10);






//Test N1
console.log(pm.getProducts());
//Test N2
const producto1 = {title:"producto prueba", description:"este es un producto prueba", price:200, thumbnail:"Sin imagen", code:"abc123", stock:25}
pm.addProduct(producto1);
//Test N3
console.log(pm.getProducts());
//Test N4
console.log(pm.getProductById(1));
//Test N5
const producto2 = {title:"producto prueba 2", description:"este es un producto prueba numero dos", price:200, thumbnail:"Sin imagen", code:"abc123", stock:25}
pm.updateProduct(1, producto2);
//Test N6
pm.deleteProduct(1);

*/
