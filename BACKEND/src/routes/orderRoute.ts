import express, { Response } from "express";
import { checkoutforuser } from "../services/cartservices";
import validateJWT from "../middleware/validateJWT";
import { extendRequest } from "../types/extendRequest";
import { getordersforUser } from "../services/orderservices";

const Router = express.Router();
Router.get('/', validateJWT, async (req: extendRequest, res: Response) => {
  try {
    const userId = req?.user?._id;
    const orders = await getordersforUser({ userId });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error getting cart:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});
Router.post('/', validateJWT, async (req: extendRequest, res: Response) => {
  try {
    const userId = req?.user._id;
    const response = await checkoutforuser({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.error("Error during checkout:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});
export default Router;
