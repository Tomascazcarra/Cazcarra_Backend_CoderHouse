import dotenv from "dotenv"

dotenv.config({
    
});

export default {
    app:{
        PORT:process.env.PORT||8080,
        PERSISTENCE:process.env.PERSISTENCE||"MONGO",
        LOGGER:process.env.LOGGER||"prod"
    },
    mongo:{
        URL:process.env.MONGO_URL||"localhost:27017"
    },
    auth:{
        ADMIN_EMAIL:process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD:process.env.ADMIN_PASSWORD
    }
}