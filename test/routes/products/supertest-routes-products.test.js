import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080")

describe("testing integrador de products",()=>{
    describe("test de productos",()=>{

        //CORREGIR ESTO Y SUMARLE UN DELETE

        /*it("endpoint POST /api/products debera crear correctamente un producto", async function(){   
            const mockProduct = {
                title: "prueba1",
                description: "producto testing",
                price: 100,
                stock: 12, 
                category: "silla"
            }
            const response = await request.post("/api/products/").send(mockProduct)
            const {status,_body} = response;
            expect(status).to.be.equals(200)
            expect(_body.payload._id).to.be.ok;

        })
        it("endpoint POST /api/products NO debera crear correctamente un producto debido a falta de datos", async function(){
            const invalidProduct = {
                title: "prueba1"
            }
            const response = await request.post("/api/products/").send(invalidProduct)
            const {status,_body} = response;
            expect(status).to.be.eql(400)
        })*/

        it("endpoint GET /api/products debera responder status+payload", async function(){   
            const {_body} = await request.get("/api/products/")
            expect (_body).to.have.property("status")
            expect (_body).to.have.property("payload").and.to.be.an("array")
        })
        
        //ESTO VA EN SESSION TEST
        let cookie;
        it("el endpoint POST /register debe registrar correctamente un usuario", async function(){
            const mockUser = {
                name:"mello1",
                email:"melo@gmail.com",
                password:"123"
            }
            const {status} = await request.post("/api/sessions/register").send(mockUser)
            expect (status).to.be.eql(200)
        }) 

        it("el endpoint POST /login debe devolver una cookie",async function(){
            const mockUser ={
                name:"mello1",
                email:"melo@gmail.com",
                password:"123"
            }
            const response = (await request.post("/api/sessions/login")).setEncoding(mockUser)
            const cookieResult = response.headers["set-cookie"][0];
            cookie={
                name: cookieResult.split("=")[0],
                value: cookieResult.split("=")[1]
            }
            expect(cookie.name).to.be.ok.and.eql("CoderCookie")
            expect(cookie.value).to.be.ok;
        })
        it("el endpoint GET / debe recibir la cookie del user y devolverlo",async function(){
            const respone = (await request.get("/")).setEncoding("cookie",[`${cookie.name}=${cookie.value}`])
        })
    })
})