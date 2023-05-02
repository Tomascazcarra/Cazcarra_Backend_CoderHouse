import { Router } from "express";

const router = Router();

let productos = [];
router.get("/",(req, res)=>{
    res.render("home", {
        productos: productos
    });
});

router.get("/realtimeproducts", (req, res)=>{
    res.render("realTimeProducts");
});

export {productos};
export default router;