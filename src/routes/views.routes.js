import CustomRouter from "./routes.js";
import express from "express";
import ProductModel from "../dao/models/product.model.js";
import CartModel from "../dao/models/cart.model.js";
import { getProducts } from "../controllers/products.controllers.js";
import ProductManager from "../dao/managers/productManagerMongo.js";
import jwt from 'jsonwebtoken'

const productManager = new ProductManager()

export default class viewsRouter extends CustomRouter {
    init () {

    this.get("/login", ['PUBLIC'], (req, res) => {
        res.render("partials/login", {
            title: "Inicia sesion"
    })
    const user = req.session.user;
    res.sendSuccess(user)
})

this.get("/register", ['PUBLIC'], (req, res) => {
    res.render("partials/register", {
        title: "Registrate"
    })
})

// -------- Productos con paginacion
this.get("/products", ['PUBLIC'], async (req, res) => {

    const limit = parseInt(req.query?.limit ?? 10);
    const page = parseInt(req.query?.page ?? 1);
    const category = req.query.category ?? '' ;
    const sort = req.query.sort ?? '' ;
    const stock = parseInt(req.query.stock) ?? '' ;

    const user = req.session.user;

    const products = await productManager.getProducts(limit, page, category, sort, stock)
        res.render('partials/products',{
            products,
            user
        }) 
})

// -------- Vista Home / Inicio
this.get("/", ['PUBLIC'], async (req, res) => {

    const user = req.session.user;
    const products = await ProductModel.find().lean().exec()

    res.render("home", {
        title: "Home",
        product: products,
        user
    })
})

// -------- Vista de Real Time Products - Websocket
this.get("/realTime", ['ADMIN'], async (req, res) => {
    const user = req.session.user;
    const products = await ProductModel.find().lean().exec()

    res.render("partials/realTimeProducts",{
        title: "Real Time",
        product: products,
        user
    })
})

// -------- Vista de WebChat - Websocket
this.get("/chat", ['USER'], async (req, res) => {
    const user = req.session.user;

    const token = jwt.sign(user, 'secret')

    console.log("token", token)

    res.render("partials/chat",{
        title: "Live Chat",
        user,
        token
    })
    
    res.sendSuccess(token)

})

// ------- Vista de informacion del producto
this.get("/product/:pid", ['PUBLIC'], async (req, res) => {
    const user = req.session.user;
    const { pid } = req.params;
    const product = await ProductModel.findById(pid).lean().exec()

    res.render("partials/product",{
        title: "Detalles",
        product: product,
        user
    })
})

// -------- Vista completa del carrito
this.get("/cart/:cid", ['USER'], async (req, res) => {

    const user = req.session.user;
    const { cid } = req.params;
    const cart = await CartModel.findById(cid).lean().exec()

    res.render("partials/cart",{
        title: "Cart",
        cart: cart,
        user
    })
})
    }
}