import express from "express";
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/products.controllers.js";

const productRouter = express.Router();

productRouter.get("/", getProducts)

productRouter.get("/:pid", getProductById)

productRouter.post("/", addProduct)

productRouter.put("/:pid", updateProduct)

productRouter.delete("/:pid", deleteProduct)

export default productRouter;