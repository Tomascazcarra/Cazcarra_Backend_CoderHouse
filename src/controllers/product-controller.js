import { productService } from "../services/repositories.js"
import productsModel from "../dao/mongo/models/products.js"
import { generateProduct } from "../mocks/product-mock.js"
import EErrors from "../constants/EErrors.js";
import { productErrorIncompleteValues } from "../constants/product-error.js";
import ErrorService from "../services/error.services.js";
import config from "../config/config.js";

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
        let owner = null
        if(req.user.role == "premium"){
            owner = req.user.email || "admin"
        }
        else{
            owner = "admin"
        }
        
        if(!title || !description || !price || !stock || !category){
            ErrorService.createError({
                name:"Product creation error",
                cause:productErrorIncompleteValues(),
                code: EErrors.INCOMPLETE_VALUES,
                message:"VALORES INCOMPLETOS",
                status:400
            })
        }
        const products = {
            title,
            description,
            price,
            stock,
            category,
            owner
        }
        const result = await productService.createProducts(products);
        req.logger.debug("Producto creado correctamente")
        res.sendStatus(201);
    }

    getProductsBy = async (req, res) =>{
        const {pid} = req.params;
        const products = await productService.getProductsBy({_id: pid});
        if(!products) return res.status(404).send({status:"error", error: "Producto no encontrado"})
        res.send({status:"success", payload:products})
    }

    updateProducts = async (req, res) =>{
        const {pid} = req.params;
        const product = await productService.getProductsBy({_id:pid})
        if(req.user.role == "premium" && req.user.email != product.owner){
            return res.status(405).send({status:"error", error: "No se puede actualizar un producto que usted no creo"})
        }
        const updateProducts = req.nody;
        const result = await productService.updateProducts(pid, updateProducts)
        req.logger.debug("Producto actualizado correctamente")
        res.sendStatus(201);
    }

    deleteProducts = async (req, res) =>{
        const {pid} = req.params;
        const product = await productService.getProductsBy({_id:pid})
        if(req.user.role == "premium" && req.user.email != product.owner){
            return res.status(405).send({status:"error", error: "No se puede eliminar un producto que usted no creo"})
        }
        const result = await productService.deleteProducts(pid)
        req.logger.debug("Producto eliminado correctamente")
        res.sendStatus(201);
    }

    createMockProducts = async (req, res) =>{
        const products = []
        for(let i=0;i<100;i++){
            products.push(generateProduct())
        }
        req.logger.debug("Se crearon 100 productos correctamente")
        res.send({status:"success", payload:products})
    }

}