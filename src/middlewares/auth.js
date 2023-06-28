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

export const passportCall =(strategy, options={}) =>{
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