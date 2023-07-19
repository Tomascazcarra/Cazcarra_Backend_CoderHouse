import ProductService from "./repositories/product-services.js";
import ProductPersistenceFactory from "../dao/factories/product-factory.js";
import CartsService from "./repositories/cart-services.js";
import CartPersistenceFactory from "../dao/factories/cart-factory.js";
import TicketPersistenceFactory from "../dao/factories/ticket-factory.js"
import TicketService from "./repositories/ticket-services.js";


export const productService = new ProductService(await ProductPersistenceFactory.getPersistence())
export const cartService = new CartsService(await CartPersistenceFactory.getPersistence())
export const ticketService = new TicketService(await TicketPersistenceFactory.getPersistence())