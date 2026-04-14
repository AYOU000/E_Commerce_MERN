import express from "express";
import mongoose from "mongoose";
import { getallproduct } from "../services/Productservice.js";

const Router = express.Router();

Router.get('/', async (request, response) => {
  try {
    const product = await getallproduct();
    response.status(200).send(product);
  } catch (err) {
    console.error("Error getting all products:", err);
    response.status(500).send({ error: "Internal server error" });
  }
});

export default Router;