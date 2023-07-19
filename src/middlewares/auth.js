import passport from "passport";

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

export const allowUsers = async(req,res,next) => {
    const role = "user"
    if(req.user.role!=role){
        return res.status(403).send({status:"error",error:"Fobidden"})
    }
    next();
}

export const allowAdmin = async(req,res,next) => {
    const role = "admin"
    if(req.user.role!=role){
        return res.status(403).send({status:"error",error:"Fobidden"})
    }
    next();
}