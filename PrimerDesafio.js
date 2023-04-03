class ProductManager {
    constructor() {
        this.products = [];
    }

    generateId() {
        if (this.products.length == 0) {
            return 1
        };
        return this.products[this.products.length - 1].id + 1;
    }

    getProducts() {
        return this.products;
    }

    addProduct(product) {
        if (this.products.some(p => p.code === product.code)) {
            throw new Error("El código del producto ya existe.");
        }

        const newProduct = {
            id: this.generateId(),
            ...product
        };

        this.products.push(newProduct);
    };

    getProductById(id) {
        const product = this.products.find(p => p.id === id);

        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        else {
            return product;
        }
    }
}

const pm = new ProductManager();

console.log(pm.getProducts());

const newProduct = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
};

pm.addProduct(newProduct);
console.log(pm.getProducts());

try {
    pm.addProduct(newProduct);
} catch (err) {
    console.error(err.message);
}

console.log(pm.getProductById(1));

try {
    pm.getProductById(-1);
} catch (err) {
    console.error(err.message);
};