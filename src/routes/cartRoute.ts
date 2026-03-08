import express, { Response } from "express";
import { getActiveCartforUser } from "../services/cartservices";
import validateJWT, { extendRequest } from "../middleware/validateJWT";

const Router = express.Router();

Router.get('/', validateJWT, async (req: extendRequest, res: Response) => {
  const userId = req.user._id;
  const cart = await getActiveCartforUser({ userId });
  res.status(200).send(cart);
});

export default Router;