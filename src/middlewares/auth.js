import jwt from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcrypt';
import config from '../config/config.js';

export const privacy = (privacyType) =>{
    return (req,res, next) => {
        const {user} = req.session;
        switch (privacyType) {
            case "PRIVATE":
                if(user) next();
                else res.redirect("/login")
                break;
            case "NO_AUTHENTICATED":
                if(!user) next();
                else res.redirect("/products")
        }
    };
}

export const passportCall = (strategy, options={}) =>{
    return async(req,res,next) =>{
        passport.authenticate(strategy, (error,user,info) =>{
            if(error) return next(error);
            if(!user) res.status(400).send({status:"error", error})
            req.logIn(user, async (loginError) => {
                if (loginError) return next(loginError);
                req.user = user
                next();
              });
        })(req,res,next);
    }
}


export const allowRoles = (roles) => {
    return async(req,res,next) => {
      if(!roles.includes(req.user.role)) return res.status(403).send({status:"error",error:"Fobidden"})
      next();
    }
}

export const generateToken = (user, expiresIn='1d') =>{
    return jwt.sign(user,config.jwt.SECRET,{expiresIn});
}

export const createHash = async (password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}

export const validatePassword = (password,hashedPassword) => bcrypt.compare(password,hashedPassword);