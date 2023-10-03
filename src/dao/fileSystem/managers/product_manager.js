import fs from "fs"

export default class ProductManager {
    constructor(path) {
        this.path = path;
    };

    generateId = async () => {
        let productos = await this.getProducts()
        if (productos.length == 0) {
            return 1
        };
        return productos[productos.length - 1].id + 1;
    };

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            let data = await fs.promises.readFile(this.path, "utf-8")
            let productos = JSON.parse(data)
            return productos
        }
        return [];
    };

    createProducts = async (product) => {
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

    getProductById = async (id) => {
        let productos = await this.getProducts();
        const product = productos.find(p => p.id == id);
        return product;
    }

    updateProducts = async (id, producto) => {
        let productos = await this.getProducts()
        const index = productos.findIndex(p => p.id == id);
        if (index == -1) {
            throw new Error("Producto no encontrado.");
        }
        else {
            const productToUpdate = productos[index]
            for (let attribute in producto) {
                productToUpdate[attribute] = producto[attribute];
            }
            productos[index] = productToUpdate
            await fs.promises.writeFile(this.path, JSON.stringify(productos))
        }
    }

    deleteProducts = async (id) => {
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


