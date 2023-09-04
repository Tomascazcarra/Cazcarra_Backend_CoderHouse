import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080")


describe("testing integrador de sessions",()=>{
    describe("testeo de cookie en register",()=>{
        it("el endpoint POST /api/sessions/register debe registrar correctamente un usuario")
    })
})