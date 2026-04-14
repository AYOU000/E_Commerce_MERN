import express, { Response } from "express";
import { additemforuser, checkoutforuser, clearCartforuser, decreaseQuantity, deleteitemforuser, getActiveCartforUser, increaseQuantity } from "../services/cartservices.js";
import { extendRequest } from "../types/extendRequest.js";
import validateJWT from "../middleware/validateJWT.js";

const Router = express.Router();

Router.get('/', validateJWT, async (req: extendRequest, res: Response) => {
  try {
    const userId = req?.user?._id;
    const cart = await getActiveCartforUser({ userId ,popluateProduct:true});
    res.status(200).send(cart);
  } catch (err) {
    console.error("Error getting cart:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});
Router.delete('/', validateJWT, async (req: extendRequest, res: Response) => {
  try {
    const userId = req?.user?._id;
    const response = await clearCartforuser({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});
Router.post('/item', validateJWT, async (req: extendRequest, res: Response) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await additemforuser({ productId, quantity, userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});
Router.put('/item/decrease', validateJWT, async (req: extendRequest, res: Response) => {
  try {
    const userId = req?.user?._id;
    const { productId } = req.body;
    const response = await decreaseQuantity({ productId, userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.error("Error updating item in cart:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});
Router.put('/item/increase', validateJWT, async (req: extendRequest, res: Response) => {
  try {
    const userId = req?.user?._id;
    const { productId } = req.body;
    const response = await increaseQuantity({ productId, userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.error("Error updating item in cart:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});
Router.delete('/item/:productId', validateJWT, async (req: extendRequest, res: Response) => {
  try {
    const userId = req?.user?._id;
    const { productId } = req.params;
    const response = await deleteitemforuser({ productId, userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    console.error("Error deleting item from cart:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});
Router.post('/checkout', validateJWT, async (req: extendRequest, res: Response) => {
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