import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel";

 export interface extendRequest extends Request
{
  user?:any;
}
const validateJWT = (req:extendRequest, res:Response,next: NextFunction) =>
{

    const authorizationheader = req.get("authorization");
    
    if(!authorizationheader)
    {
        res.status(403).send("authorization header wasn t provided");
        return;
    }
    const token = authorizationheader.split(" ")[1];

    if(!token)
    {
        res.status(403).send("bearer token not  found");
        return; 
    }

    jwt.verify(token,"BkD+ur1mE8LfZM6KI2X3XZmkDJt0ZXKrbOOJyATqqZI=" ,async (err,playload)=>
    {
      if(err)
      {
        res.status(403).send("invalid token");
        return;
      }

      if(!playload)
      {
         res.status(403).send("invalid token playload");
        return;
      }
       const playloadUser = playload as 
       {
          firstname:string;
          lastname:string;
          email:string;
       }

       const user = await userModel.findOne({email:playloadUser.email})
       req.user =  user;
       next();
    })

}


export default validateJWT;