import express, { Response } from "express";
import { additemforuser, getActiveCartforUser } from "../services/cartservices";
import { extendRequest } from "../types/extendRequest";
import validateJWT from "../middleware/validateJWT";

const Router = express.Router();

Router.get('/', validateJWT, async (req: extendRequest, res: Response) => {
  const userId = req?.user?._id;
  const cart = await getActiveCartforUser({ userId });
  res.status(200).send(cart);
});

Router.post('/item', validateJWT, async (req: extendRequest, res: Response) => {
   const userId = req?.user?._id;
   const {productId,quantity} = req.body;
   const response = await additemforuser({productId,quantity,userId})
  res.status(response.statusCode).send(response.data);
});
export default Router;