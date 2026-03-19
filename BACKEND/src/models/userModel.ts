import mongoose, { Schema ,Document}  from "mongoose";

export interface IUser extends Document
{
  firstname: string;
  lastname:string;
  email:string;
  password:string;
}

const userschema = new Schema<IUser>({

    firstname:{type: String,required:true},
    lastname:{type: String,required:true},
    email:{type: String,required:true},
    password:{type: String,required:true}
})

const userModel = mongoose.model<IUser>('user',userschema);

export default userModel;