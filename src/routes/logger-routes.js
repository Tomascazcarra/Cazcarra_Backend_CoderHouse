import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.sendStatus(200)
})

router.get("/loggerTest", (req, res) => {
    req.logger.fatal("Fatal");
    req.logger.error("Error");
    req.logger.warning("Warning");
    req.logger.http("Http");
    req.logger.info("Info");
    req.logger.debug("Debug");
    res.sendStatus(200);
})

export default router;