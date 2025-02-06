import express from "express";
import "./database/config.js"
import { engine } from "express-handlebars";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";
//import viewsRouter from "./routes/views.router.js";

const app = express();

process.loadEnvFile();

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
//app.use("/", viewsRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en  http://${HOSTNAME}:${PORT}`);
});

