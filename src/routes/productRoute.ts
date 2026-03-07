import express from "express";
import mongoose from "mongoose";
import { getallproduct } from "../services/Productservice";

const Router = express.Router();

Router.get('/',async (request, response) =>
{
    const product = await getallproduct();
   response.status(200).send(product)
})

export default Router;