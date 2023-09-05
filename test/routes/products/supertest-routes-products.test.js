import chai from "chai";
import supertest from "supertest";
import config from "../../../src/config/config.js";

const expect = chai.expect;
const request = supertest("http://localhost:8080")

describe("testing integrador de products",()=>{
    describe("test de productos",()=>{
        it("endpoint GET /api/products debera responder status+payload", async function(){   
            const {_body} = await request.get("/api/products/")
            expect (_body).to.have.property("status")
            expect (_body).to.have.property("payload").and.to.be.an("array")
        })
        //Registro con cookie
        let cookie;
        it("el endpoint POST /register debe registrar correctamente un usuario", async function(){
            const mockUser = {
                first_name:"mello12312342321",
                last_name:"sdasdsa",
                email:"melo1234412312@gmail.com",
                password:"123"
            }
            const {status} = await request.post("/api/sessions/register").send(mockUser)
            expect (status).to.be.eql(200)
        }) 

        it("el endpoint POST /login debe devolver una cookie",async function(){
            const mockUser ={
                email:"tomas@gmail.com",
                password:"123"
            }
            const response = await request.post("/api/sessions/login").send(mockUser)
            const cookieResult = response.headers["set-cookie"][0];
            cookie={
                name: cookieResult.split("=")[0],
                value: cookieResult.split("=")[1]
            }
            expect(cookie.name).to.be.ok.and.eql("connect.sid")
            expect(cookie.value).to.be.ok;
        })
        it("el endpoint GET / debe recibir la cookie del user y devolverlo",async function(){
            const response = await request.get("/").set("Cookie",[`${cookie.name}=${cookie.value}`])
        })
        
        
        it("endpoint POST /api/products debera crear correctamente un producto", async function(){   
            const mockProduct = {
                title: "prueba1s3123",
                description: "producto testing31231",
                price: 1020,
                stock: 12, 
                category: "mesa"
            }
            const response = await request.post("/api/products/").set("Cookie", [`${cookie.name}=${cookie.value}`]).send(mockProduct)
            const {status,_body} = response;
            expect(status).to.be.equals(201)

        })
        it("endpoint POST /api/products NO debera crear correctamente un producto debido a falta de datos", async function(){
            const invalidProduct = {
                title: "prueba1"
            }
            try{
                const response = await request.post("/api/products/").set("Cookie", [`${cookie.name}=${cookie.value}`]).send(invalidProduct)
            }catch(error) {
                console.log(error.response)
                expect(error.status).to.be.equals(400)
            }
            
            /*
            const response = await request.post("/api/products/").set("Cookie", [`${cookie.name}=${cookie.value}`]).send(invalidProduct)
            const {status,_body} = response;
            expect(status).to.be.eql(400)*/
        })
    })

    
})



