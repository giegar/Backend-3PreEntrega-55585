import express from "express";
import nodemailer from 'nodemailer';
import config from "../config/config.js";

const emailRouter = express.Router();

const transport = nodemailer.createTransport({
    service: config.emailService,
    port: config.emailPort,
    auth: {
        user: config.googleAppUser,
        pass: config.googleAppPass
    }
})

emailRouter.get('/email', async (req, res) => {

    const result = await transport.sendMail({
        from: config.googleAppUser,
        to: config.googleAppUser,
        subject: 'Welcome!',
        html:`
            <div>
                <h1>Welcome to our Community</h1>
                <h3>We have a little gift for you</h3>
                <div>
                <h4>25% OFF in our E-Commerce<h4>
                </div>
            </div>
        `  
    })
    console.log(result)
    res.send('email sent')  
})

export default emailRouter