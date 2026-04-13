import express from "express";
import mongoose from "mongoose";
import {
  login,
  Register,
  updateEmailforuser,
  updatePasswordforuser,
} from "../services/userService.js";
import validateJWT from "../middleware/validateJWT.js";
import { extendRequest } from "../types/extendRequest.js";
import { Response } from "express";

const Router = express.Router();

Router.post("/Register", async (request, response) => {
  try {
    const { firstname, lastname, email, password } = request.body;
    const { statusCode, data } = await Register({
      firstname,
      lastname,
      email,
      password,
    });

    response.status(statusCode).json(data);
  } catch (err) {
    console.error("Error registering user:", err);
    response.status(500).send({ error: "Internal server error" });
  }
});
Router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const { statusCode, data } = await login({ email, password });

    response.status(statusCode).json(data);
  } catch (err) {
    console.error("Error logging in user:", err);
    response.status(500).send({ error: "Internal server error" });
  }
});
Router.put("/", validateJWT, async (req: extendRequest, res: Response) => {
  try {
    const Useremail = req?.user?.email;
    if (!Useremail) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const { Newemail } = req.body;
    const response = await updateEmailforuser({ Useremail, Newemail });
    res.status(response.statusCode).json(response.data);  
  } catch (err) {
    console.error("Error updating email:", err);
    res.status(500).json({ message: "Internal server error" }); 
  }
});
Router.put("/password", validateJWT, async (req: extendRequest, res: Response) => {
  try {
    const userId = req?.user?._id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const { currentPassword,newPassword } = req.body;
    const response = await updatePasswordforuser({userId , currentPassword, newPassword });
    res.status(response.statusCode).json(response.data);  
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Internal server error" }); 
  }
});

export default Router;
