import http from "http"

const server = http.createServer((request,response)=>{
    response.end(`Hola backend !`)
})

server.listen(8080,()=>{
    console.log(`server listen on PORT 8080`)
})