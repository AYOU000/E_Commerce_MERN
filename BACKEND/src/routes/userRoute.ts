import express from "express";
import mongoose from "mongoose";
import { login, Register } from "../services/userService.js";

const Router = express.Router();

Router.post('/Register', async (request, response) => {
  try {
    const { firstname, lastname, email, password } = request.body;
    const { statusCode, data } = await Register({ firstname, lastname, email, password });

    response.status(statusCode).json(data);
  } catch (err) {
    console.error("Error registering user:", err);
    response.status(500).send({ error: "Internal server error" });
  }
});
Router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;
    const { statusCode, data } = await login({ email, password });

    response.status(statusCode).json(data);
  } catch (err) {
    console.error("Error logging in user:", err);
    response.status(500).send({ error: "Internal server error" });
  }
});


export default Router;