import { productService } from "../services/repositories.js"
import productsModel from "../dao/mongo/models/products.js"


export default class ProductsController{

    getProducts = async (req, res) =>{
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

        let prevLink = hasPrevPage ?  `http://localhost:${config.app.PORT}/api/products/?page=`+prevPage : null
        let nextLink = hasNextPage ?  `http://localhost:${config.app.PORT}/api/products/?page=`+nextPage : null

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
    }

    createProducts = async (req, res) =>{
        const {title, description, price, stock, category} = req.body;
        if(!title || !description || !price || !stock || !category) return res.status(400).send({status:"error", error:"faltan campos"})
        const products = {
            title,
            description,
            price,
            stock,
            category
        }
        const result = await productService.createProducts(products);
        res.sendStatus(201);
    }

    getProductsBy = async (req, res) =>{
        const {pid} = req.params;
        const products = await productService.getProductsBy({_id: pid});
        if(!products) res.status(404).send({status:"error", error: "Producto no encontrado"})
        res.send({status:"success", payload:products})
    }

    updateProducts = async (req, res) =>{
        const {pid} = req.params;
        const updateProducts = req.nody;
        const result = await productService.updateProducts(pid, updateProducts)
        res.sendStatus(201);
    }

    deleteProducts = async (req, res) =>{
        const {pid} = req.params;
        const result = await productService.deleteProducts(pid)
        res.send({status:"success"})
    }

}