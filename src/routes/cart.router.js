import { Router } from "express";
import CartModel from "../models/cart.models.js";
import ProductModel from "../models/products.model.js";

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
  try {
    const pizzas = await ProductModel.find({});
    if (!pizzas.length) {
      return res.status(404).json({ message: "No hay pizzas en la base de datos" });
    }
    res.json(pizzas); // Enviar datos como JSON
  } catch (error) {
    console.error("Error al obtener las pizzas:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

cartRouter.post("/", async (req, res) => {});

cartRouter.get("/:cid", async (req, res) => {});

cartRouter.post("/:cid/product/:pid", async (req, res) => {});

export default cartRouter;
