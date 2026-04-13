import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface RegisterPrams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
interface loginPrams {
  email: string;
  password: string;
}
interface updateEmailforuserPrams {
  Useremail: string;
  Newemail: string;
}
interface updatePasswordforuserPrams {
  userId: any;
  currentPassword: string;
  newPassword: string;
}
const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRETKEY || "", { expiresIn: "1d" });
};
export const Register = async ({
  firstname,
  lastname,
  email,
  password,
}: RegisterPrams) => {
  const finduser = await userModel.findOne({ email });
  if (finduser) {
    return { data: "incorrect email or password", statusCode: 400 };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return { data: generateJWT({ firstname, lastname, email }), statusCode: 200 };
};
export const login = async ({ email, password }: loginPrams) => {
  const finduser = await userModel.findOne({ email });
  if (!finduser) {
    return { data: "incorrect email or password", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, finduser.password);
  if (passwordMatch) {
    return {
      data: generateJWT({
        firstname: finduser,
        lastname: finduser,
        email: finduser.email,
      }),
      statusCode: 200,
    };
  }

  return { data: "incorrect email or password", statusCode: 400 };
};
export const updateEmailforuser = async ({
  Useremail,
  Newemail,
}: updateEmailforuserPrams) => {
  if (!Useremail || !Newemail) {
    return { statusCode: 400, data: { message: "Missing email fields" } };
  }

  const finduser = await userModel.findOne({ email: Useremail });
  if (!finduser) {
    return { statusCode: 404, data: { message: "Current email not found" } };
  }

  const checkEmail = await userModel.findOne({ email: Newemail });
  if (checkEmail) {
    return { statusCode: 409, data: { message: "Email already exists" } };
  }

  const updated = await userModel.findOneAndUpdate(
    { email: Useremail },
    { email: Newemail },
    { new: true },
  );

  if (!updated) {
    return { statusCode: 500, data: { message: "Failed to update email" } };
  }

  return {
    statusCode: 200,
    data: {
      message: "Email updated successfully",
      token: generateJWT({
        firstname: updated.firstname,
        lastname: updated.lastname,
        email: updated.email,
      }),
    },
  };
};
export const updatePasswordforuser = async ({
  userId,
  currentPassword,
  newPassword,
}: updatePasswordforuserPrams) => {

  const finduser = await userModel.findById(userId);  
  if (!finduser) {
    return { statusCode: 404, data: { message: "User not found" } };
  }

  const passwordMatch = await bcrypt.compare(currentPassword, finduser.password);
  if (!passwordMatch) {                               
    return { statusCode: 400, data: { message: "Current password is incorrect" } };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  finduser.password = hashedPassword;
  await finduser.save();

  return { statusCode: 200, data: { message: "Password updated successfully" } };
};
