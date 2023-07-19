export default class ProductService{
    constructor(dao){
        this.dao = dao;
    }

    getProducts = () =>{
        return this.dao.getProducts();
    }
    getProductsBy = (params) =>{
        return this.dao.getProductsBy(params);
    }
    createProducts = (products) =>{
        return this.dao.createProducts(products);
    }
    updateProducts = (id, products) =>{
        return this.dao.updateProducts(id, products);
    }
    deleteProducts = (id) => {
        return this.dao.deleteProducts(id);
    }
}