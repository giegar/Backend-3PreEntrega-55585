import express from "express";
import { addCart, getCartById, addProductCart, updateProductCart, deleteProductCart, emptyCart, getCarts } from "../controllers/carts.controller.js";

const cartRouter = express.Router();


cartRouter.post("/", addCart)

cartRouter.get("/", getCarts)

cartRouter.get("/:cid", getCartById)

cartRouter.post("/:cid/products/:pid", addProductCart)

cartRouter.put("/:cid/products/:pid", updateProductCart)

cartRouter.delete("/:cid/products/:pid", deleteProductCart)

cartRouter.delete(":cid/products/:pid", emptyCart)

export default cartRouter;