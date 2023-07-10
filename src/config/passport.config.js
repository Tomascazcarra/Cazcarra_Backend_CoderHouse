import passport from "passport";
import local from "passport-local"
import userModel from "../dao/mongo/models/user.js"
import { createHash, validatedPassword } from "../utils.js";
import GithubStrategy from "passport-github2"
import cartsMongoManager from "../dao/mongo/managers/carts-manager.js"
import config from "./config.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use("register", new LocalStrategy({passReqToCallback:true, usernameField: "email"},async(req,email,password,done)=>{
        try{
            const{first_name, last_name, age} = req.body;
            const exists = await userModel.findOne({email});
            if (exists) return done(null, false,{message: "El usuario ya existe"})
            const hashedPassword = await createHash(password);
            // Creo un carrito, me traigo el ID y se lo pongo al atributo cart.
            const cartsService = new cartsMongoManager()
            const cart = {"products":[]};
            const cartId = await cartsService.createCarts(cart)
            const user = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                age: age,
                cart: cartId,
                password: hashedPassword
            }
            const result = await userModel.create(user);
            done(null,result);
        }catch(error){
            done(error);
        }
    }))

    passport.use("login", new LocalStrategy({usernameField:"email"},async(email, password, done)=>{
    if(email === config.auth.ADMIN_EMAIL && password===config.auth.ADMIN_PASSWORD){
        const user ={
            id: 0,
            name: `Admin`,
            role: "admin",
            email: "..."
        }
        return done(null, user);
    }
    let user
    user = await userModel.findOne({email});
    if(!user) return done(null, false, {message:"credenciales incorrectas"})

    const isValidPassword = await validatedPassword(password, user.password)
    if(!isValidPassword) return done(null, false,{message:"contraseña incorrecta"})
    
    user = {
        id: user._id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role,
        age: user.age,
        cart: user.cart
    }
    return done(null, user);
    }))
}

passport.use("github", new GithubStrategy({
    clientID: "Iv1.6c46f7035d81137f",
    clientSecret: "c66ab664c03c355a046ed3c649d39d6c161b91d7",
    callbackURL: `http://localhost:${config.app.PORT}/api/sessions/githubcallback`,

}, async(accessToken, refreshToken, profile, done)=>{
    try{
        console.log(profile);
        const {name, email} = profile._json;
        const user = await userModel.findOne({ email });
        if(!user) {
            const newUser = {
                first_name: name,
                email,
                password:""
            }
            const result = await userModel.create(newUser);
            done(null, result);
        }
        done(null, user);
    }catch(error){
        done(error);
    }
}
))

passport.serializeUser(function (user,done){
    return done(null,user.id)
})
passport.deserializeUser(async function (id, done){
    const user = await userModel.findOne({_id: id});
    return done(null, user)
})

export default initializePassport;