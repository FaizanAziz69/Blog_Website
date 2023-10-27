import express from 'express';
import UserSchema from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import config from '../config/config.js';
import jwt from 'jsonwebtoken'
import multer from 'multer';
// import { fileURLToxPath } from 'url';
import path from 'path';
import UserModel from '../models/userSchema.js';



const storage = multer.diskStorage({
    destination:'./uploads',
    
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

  export  const upload = multer({
    storage:storage
  })
   




const securePassword = async(password)=>{
    try{
        const passwordhash = await bcrypt.hash(password,10);
        return passwordhash;
    }catch(err){
        console.log(err.message)
    }
}

const createToken = async(_id)=>{
try{
    const token =  jwt.sign({_id},config.secertJwt)
    return token;
}catch(err){
    res.json({message:err})
}
}

export const CreateUser = async(req,res)=>{
  
    const spassword =  await securePassword(req.body.password)

// const{orginalname,buffer,mimetype} = req.file
const buffer = req.file;
const mimetype = req.file;


    
 const user = new UserSchema({
    name:req.body.name,
    email:req.body.email,
    password:spassword,
    phoneNo:req.body.phoneNo,
    image:{
        data:buffer,
        contentType:mimetype 
            
    },
    role:req.body.role,
 })
 
 user.save()
 .then(data=>{
   
     res.json({data})
 }).catch(err=>{
     res.json({message : err})
 })
 }
 export const GetUserbyId = async(req,res)=>{
     try{
     const user = await UserSchema.findById(req.params.UserId);
  res.json(user)   
     }catch(err){
     res.json({message:err})
 }
 }
 export const getAllUsers = async(req,res)=>{
    try{
        const page = req.query.p||0
        const usersPerPage = 3

    
    const allUsers  = await UserSchema.find({}).skip(page*usersPerPage).limit(usersPerPage)
    res.json(allUsers)
   }catch(err){
    res.json({message:err})
   }
 }





export const deleteUser = async(req,res)=>{
    try{
        const deleteuser = await UserSchema.deleteOne({_id:req.params.UserId})
    res.json(deleteuser)
    }catch(err){
        res.json({message:err})
    }
    }
 export const updateUser = async(req,res)=>{
     try{
     const updatedUser = await UserSchema.updateOne({_id:req.params.UserId},
        {$set:{name:req.body.name,email:req.body.email,password:req.body.password,phoneNo:req.body.phoneNo,role:req.body.role}})
     console.log(updateUser)
     res.json({name:req.body.name,email:req.body.email,password:req.body.password,phoneNo:req.body.phoneNo,rolen:req.body.role})
     }catch(err){
     res.json({message:err})
 }
}    
 export const userLogin =   async (req,res) => {

try{
    const {email, password} = req.body;
    console.log(req.body)

    const userdata =  await UserModel.findOne({email:email})
// // 
    console.log('userdata', userdata)

if(userdata){
    console.log("user data verified")
    const tokendata = await createToken(userdata._id)
    console.log("token", tokendata)

 const passwordMatch =  await bcrypt.compare(password,userdata.password)
 if(passwordMatch){
     const userResult ={
         _id:userdata._id,
         name:userdata.name,
         email:userdata.email,
        token:tokendata
    }
    // console.log(userResult)
    // const response = {
    //         succes:true,
    //         msg:"user details",
    //         data: userResult
    //     }
        res.json({msg: 'user login successful', userResult})
    }
}

}catch(err){
    console.log('err',err)
    res.json({message:"incorrect details" })
}
}
 export  const followuser =    async (req, res) => {
    try {
        const  userId  = req.params.userId;
        const followUserId = req.params.followerId
    console.log(userId,followUserId)
        const user = await UserModel.findById(userId);
        const followUser = await UserModel.findById(followUserId);
    console.log(user,'...here is user')
    console.log(followUserId,'....here is follow user id')
        if (!user || !followUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Add followUser to user's following array
        user.following.push(followUser._id);
    
        // Add user to followUser's followers array
        followUser.followers.push(user._id);
    
        // Save both user and followUser
        await user.save();
        await followUser.save();
    
        res.status(200).json({ message: 'User followed successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
   export const getUsersCountByRole = async (req,res) => {
        try {
          const aggregationResult = await UserModel.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } },
          ]);
      
          res.json(aggregationResult);
          // Handle the aggregation result as per your requirements
        } catch (err) {
          res.json({message:'err'});

        }
      };
      
    
      
    

 
  
  
  
