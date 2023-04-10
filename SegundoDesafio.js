import fs from "fs"

class ProductManager {
    constructor(path) {
        this.path = path;
    };

    generateId() {
        var productos = this.getProducts()
        if (productos.length == 0) {
            return 1
        };
        return productos[productos.length - 1].id + 1;
    };

    getProducts() {
        if(fs.existsSync(this.path)){
            var productos = fs.readFileSync(this.path, "utf-8")
            productos = JSON.parse(productos)
        }
        else{ productos = []
        }
        return productos;
    };

    addProduct(product) {
        var productos = this.getProducts()
        if (productos.some(p => p.code === product.code)) {
            throw new Error("El código del producto ya existe.");
        };
        const newProduct = {
            id: this.generateId(),
            ...product
        };
        productos.push(newProduct);
        fs.writeFileSync(this.path, JSON.stringify(productos))
    };

    getProductById(id) {
        var productos = this.getProducts();
        const product = productos.find(p => p.id === id);

        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        else {
            return product;
        }
    }
    
    updateProduct(id, producto) {
        var productos = this.getProducts()
        const index = productos.findIndex(p => p.id === id);
        if (index == -1) {
            throw new Error("Producto no encontrado.");
        }
        else {
            const updatedProduct = {
                id: id,
                ...producto
            };
            productos[index] = updatedProduct
            fs.writeFileSync(this.path, JSON.stringify(productos))
        }
    }

    deleteProduct(id) {
        var productos = this.getProducts();
        const product = productos.find(p => p.id == id);
        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        else {
            productos = productos.filter(producto => producto.id != product.id)
            fs.writeFileSync(this.path, JSON.stringify(productos))
        }
    }
};


var filepath = "productos.json";
var pm = new ProductManager(filepath);
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



