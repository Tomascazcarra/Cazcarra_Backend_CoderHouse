import { Router } from "express";
import ProductsMongoManager from "../../dao/mongo/managers/products-manager.js"
import productsModel from "../../dao/mongo/models/products.js";

const router = Router();
const productsService = new ProductsMongoManager;

router.get("/", async (req, res) =>{
    let limit = req.query.limit || 10
    let page = req.query.page || 1
    let sort = req.query.sort || ""
    let options = { page, limit: limit, lean: true }
    let queryOptions = {};
    if (sort!==""){
        if (sort == "asc"){
            sort = 1 
        }
        else if (sort == "desc"){
            sort = -1
        }
        options["sort"]={price: sort}
    }
    if (req.query.category) {
        queryOptions.category = req.query.category;
    }
    
    if (req.query.stock) {
        queryOptions.stock = {$gte: req.query.stock};
    }

    const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, ...rest} = await productsModel.paginate(queryOptions,options)

    let prevLink = hasPrevPage ?  "http://localhost:8080/api/products/?page="+prevPage : null
    let nextLink = hasNextPage ?  "http://localhost:8080/api/products/?page="+nextPage : null

    res.send({status:"success", 
                    payload:docs, 
                    totalPages: totalPages,
                    prevLink: prevLink,
                    nextLink: nextLink,
                    page: page,
                    hasPrevPage: hasPrevPage,
                    hasNextPage: hasNextPage,
                    prevPage: prevPage,
                    nextPage: nextPage
    })
})

router.post("/", async (req, res) =>{
    const {title, description, price, stock, category} = req.body;
    if(!title || !description || !price || !stock || !category) return res.status(400).send({status:"error", error:"faltan campos"})
    const products = {
        title,
        description,
        price,
        stock,
        category
    }
    const result = await productsService.createProducts(products);
    res.sendStatus(201);
})

router.get("/:pid", async (req, res) =>{
    const {pid} = req.params;
    const products = await productsService.getProductsBy({_id: pid});
    if(!products) res.status(404).send({status:"error", error: "Producto no encontrado"})
    res.send({status:"success", payload:products})
})

router.put("/:pid", async(req,res)=>{
    const {pid} = req.params;
    const updateProducts = req.nody;
    const result = await productsService.updateProducts(pid, updateProducts)
    res.sendStatus(201);
})

router.delete("/:pid", async(req,res)=>{
    const {pid} = req.params;
    const result = await productsService.deleteProducts(pid)
    res.send({status:"success"})
})

export default router;
