import { Router } from "express";
import ProductManager from "../../dao/fileSystem/managers/product_manager.js";

const router = Router();

router.get("/:pid", async (req, res) => {
    let idProduct = req.params.pid;
    let pm = new ProductManager("./productos.json");
    const product = await pm.getProductById(idProduct);
    if (!product) return res.status(404).send({ status: "error", error: "Producto no encontrado" });
    else return res.send(product);
});

router.get("/", async (req, res) => {

    let pm = new ProductManager("./productos.json");
    let products = await pm.getProducts();
    const limit = req.query["limit"]
    if (limit != undefined) {
        return res.send(products.slice(0, limit))
    }
    else return res.send(products);
});

router.post("/", async (req, res) => {
    const product = req.body;
    let pm = new ProductManager("./productos.json");
    await pm.addProduct(product);
    const productos = await pm.getProducts();
    req.io.emit("logs", productos);
    res.send({ status: "success", message: "producto creado" });
});

router.put("/:pid", async (req, res) => {
    let idProduct = req.params.pid;
    const product = req.body;
    let pm = new ProductManager("./productos.json");
    await pm.updateProduct(idProduct, product);
    const productos = await pm.getProducts();
    req.io.emit("logs", productos);
    res.send({ status: "success", message: "producto actualizado" });
})

router.delete("/:pid", async (req, res) => {
    let idProduct = req.params.pid;
    let pm = new ProductManager("./productos.json");
    await pm.deleteProduct(idProduct);
    const productos = await pm.getProducts();
    req.io.emit("logs", productos);
    res.send({ status: "success", message: "producto eliminado" });
})


export default router;