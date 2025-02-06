import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const viewsRouter = Router();

viewsRouter.get("/products", async (req, res) => {
    res.render("home");
})

viewsRouter.get("/realtimeproducts",async (req, res) => {
    res.render("home")
} )
export default viewsRouter;