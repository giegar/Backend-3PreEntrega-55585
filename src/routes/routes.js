import { Router } from "express";
import jwt from 'jsonwebtoken'

export default class CustomRouter {

    constructor (){
        this.router = Router();
        this.init()
    }

    getRouter(){
        return this.router
    }

    init(){}

    get(path, policies, ...callbacks){
        this.router.get(
            path,
            this.generateCustomResponse,
            this.handlePolicies(policies),
            this.applyCallbacks(callbacks))
    }

    post(path, policies, ...callbacks){
        this.router.post(
            path,
            this.generateCustomResponse,
            this.handlePolicies(policies),
            this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks){
        return callbacks.map( callback => async (...params) => {
            try{
                await callback.apply(this, params)
            } catch {
                //params[1].status(500).send(error)
            }
        })
    }

    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = payload => res.json({status: 'success', payload});
        res.sendServerError = error => res.status(500).json({status: 'error', error});
        res.sendUserError = error => res.status(400).json({status: 'error', error});
        res.sendNoAuthenticated = (error = 'No auth') => res.status(401).json({status: 'error', error});
        res.sendNoAuthorizedError = (error = 'No authorized') => res.status(403).json({status: 'error', error});

        next();
    }

    handlePolicies = policies => (req, res, next) => {

        if(policies.includes('PUBLIC')) return next();

        if(policies.length > 0) {
            const token = req.headers.auth

            if(!token) return res.sendNoAuthenticated('No token')

            const user = jwt.verify(token, 'secret')

            if(!policies.includes(user.role.toUpperCase())){
                return res.sendNoAuthorizedError()
            }

            req.user = user
            return next();
        }

        return res.sendNoAuthenticated('Private resource')
    }
}