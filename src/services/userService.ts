import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
 interface RegisterPrams{
  firstname: string;
  lastname:string;
  email:string;
  password:string;
 }
  interface loginPrams{
  email:string;
  password:string;
 }
export const Register = async ({firstname,lastname,email,password}:RegisterPrams) =>
{
 const finduser = await userModel.findOne({email});
  if(finduser)
  {
    return {data:"incorrect email or password",statusCode:400}
  }
  const hashedPassword = await bcrypt.hash(password,10)
  const newUser = new userModel({firstname,lastname,email,password:hashedPassword});
  await newUser.save()
  return {data:generateJWT({firstname,lastname,email}),statusCode:200}
}
export const login = async ({email,password}:loginPrams) =>
{
   const finduser = await userModel.findOne({email});
    if(!finduser)
  {
    return {data:"incorrect email or password",statusCode:400}
  }

  const passwordMatch = await bcrypt.compare(password,finduser.password)
  if(passwordMatch)
  {
    return {data:generateJWT({firstname:finduser,lastname:finduser,email}),statusCode:200}
  }

  return {data:"incorrect email or password",statusCode:400}
}

const generateJWT = (data:any) =>
{
  return jwt.sign(data,'BkD+ur1mE8LfZM6KI2X3XZmkDJt0ZXKrbOOJyATqqZI=' ,{ expiresIn: '6h' })
}