import {faker} from "@faker-js/faker/locale/es"

export const generateProduct = () =>{

    return{
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.number.int(),
    id: faker.database.mongodbObjectId(),
    }
}