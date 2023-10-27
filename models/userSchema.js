import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email: { 
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
          ],
        unique: true
      },
    password:{
        type: String,
        required:true
    },

    phoneNo:{
        type:String,
        required:true,
    },
    image:{
    data:Buffer,
    contentType:String
    },
    role:{
        type:String,
        required:true
    },
    token:{
        type:String,
        default:''
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  

    following:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

})
const UserModel = mongoose.model('UserModel',userSchema)
export default  UserModel