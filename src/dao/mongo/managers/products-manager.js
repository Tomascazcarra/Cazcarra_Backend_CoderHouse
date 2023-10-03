import productsModel from "../models/products.js";

export default class productsMongoManager {

    getProducts = () => {
        return productsModel.find().lean();
    }
    getProductsBy = (params) => {
        return productsModel.findOne(params).lean();
    }
    createProducts = (products) => {
        return productsModel.create(products);
    }
    updateProducts = (id, products) => {
        return productsModel.findByIdAndUpdate(id, { $set: products })
    }
    deleteProducts = (id) => {
        return productsModel.findByIdAndDelete(id)
    }


}
