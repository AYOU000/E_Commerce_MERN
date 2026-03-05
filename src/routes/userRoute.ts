import express from "express";
import mongoose from "mongoose";
import { login, Register } from "../services/userService.js";

const Router = express.Router();

Router.post('/Register', async (request, response) => {
    const { firstname, lastname, email, password } = request.body
    const { statusCode, data } = await Register({ firstname, lastname, email, password })

    response.status(statusCode).send(data)
})
Router.post('/login', async (request, response) => {
    const { email, password } = request.body;
    const { statusCode, data } = await login({ email, password })

    response.status(statusCode).send(data)
})


export default Router;