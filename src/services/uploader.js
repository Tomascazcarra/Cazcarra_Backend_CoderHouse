import multer from "multer";
import __dirname from "../utils.js"

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log(req.body)
        if(req.body.filetype == "document"){
            cb(null, `${__dirname}/public/documents`)
        }
        else if(req.body.filetype == "product"){
            cb(null, `${__dirname}/public/products`)
        }
        else if(req.body.filetype == "profile"){
            cb(null, `${__dirname}/public/profiles`)
        }
        else{
            cb(null, `${__dirname}/public`)
        }
    },
    filename: function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});


const uploader = multer({storage});


export default uploader;