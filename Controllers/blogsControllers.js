import express from 'express';
import blogModel from '../models/blogSchema.js';
import UserModel from '../models/userSchema.js';
import mongoose from 'mongoose';



export const CreateBlog = async(req,res)=>{

  try {
    const userId = req.params.userId
    console.log(userId)
    
    const user = await UserModel.findById(userId)
    console.log(user)
const{title,description,category,confidential} = req.body
    
    const blog = new blogModel({
      title,
      description,
      category,
      confidential,
      User:[{
        user: new mongoose.Types.ObjectId(userId),
        name:user.name,
        email:user.email
    }]
    });
    
    await blog.save();
    res.json(blog)
    console.log('Blog post created successfully');
  } catch (error) {
    console.log('Error:', error.message);
  res.json({message:"err"})
  }

}
 export const getBlogsByUser = async (req, res) => {
  const userId = req.params.userId;
  try{

     const Userblog = await   blogModel.find({ userId: userId })
      res.json(Userblog);
    }catch(err){
      res.json({message: "err"})
      res.status(500).json({ error: 'An error occurred' });
    };
  };


 export const GetBlogbyId = async(req,res)=>{
  try{
const blogId  = req.params.blogId
console.log(blogId)
const gettingblog = await blogModel.findById(blogId)
res.json(gettingblog) 
console.log(gettingblog)
  }catch(err){
  res.json("not getting blog")
}
 }
 export const getAllBlogs = async(req,res)=>{ 
   try{
          const page = req.query.p||0
         const blogsPerPage = 3
          const blogs = (await blogModel.find().populate('comments').skip(page*blogsPerPage).limit(blogsPerPage))
         const updateBlog=blogs.map((blog)=>{
            return{noOflikes:blog.likes.length,blog}
         })
          res.json({updateBlog});
        }catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server error' });
          
        } 
    }
      

      export const getBlogsByCategoryAggregate = async (req,res) => {
      try {
      const category = req.params.category;
      const pipeline = [
     { $match: { category: category } },
     {
     $addFields: {
     isPopular: {
     $gte: [
     { $size: { $ifNull: ['$views', []] } },
      5
     ]
     }
     }
     }
     ];
    const result = await blogModel.aggregate(pipeline);
    res.json(result);
    }catch (error) {
    console.error(error);
    throw new Error("An error occurred while aggregating blogs by category.");
    };
    }

export const getBlogsOfFollowingUsers = async (req, res) => {
  try {
    const { userId } = req.params;

    const currentUser = await UserModel.findById(userId)
    console.log(currentUser)
    const followingUserIds = currentUser.following.map(User => userId)
console.log(followingUserIds,'...here are the followings')
    
    const blogs = await blogModel.find({ User: { $in: followingUserIds } });
console.log(blogs,'...here are the blogs')
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blogs' });
  }
};

  export const publicBlogs = async(req,res)=>{
    try {
      const publicblog = await blogModel.find({confidential:false})
      res.json(publicblog)
    }catch(err){
      res.json(err)
    }
    };
  
 export const deleteBlog = async(req,res)=>{
 try{
  
     const removeblog = await blogModel.deleteOne({_id:req.params.blogId})
 res.json(removeblog)
 }catch(err){
     res.json({message:err})
 }
 }
 export const updateBlog = async(req,res)=>{
     try{
     const updatedblog = await blogModel.updateOne({_id:req.params.blogId},
     {$set:{title:req.body.title,authorName:req.body.authorName,description:req.body.description,category:req.body.category,confidential:req.body.confidential}})
     res.json({title:req.body.title,description:req.body.description,category:req.body.category,confidential:req.body.confidential})
     }catch(err){
     res.json({message:err})
 }
 }

export const viewblog = async(req,res)=>{


 const blogId = req.params.id;
 const userId = req.body.userId;
 try {
  
  const user = await UserModel.findById(userId)
  console.log(user)
   // Update the blog document with the user's view
   const updatedBlog = await blogModel.findByIdAndUpdate(
     blogId,
     { $addToSet: { views:{ userId, name:user.name }} },
     { new: true }
   );
console.log(user.name,'here is user name')
   if (!updatedBlog) {
     return res.status(404).json({ message: 'Blog not found' });
   }

   res.json(updatedBlog);
 } catch (error) {
   res.status(500).json({ message: 'Internal server error' });
 }
};
export const NewBlog = async(res,req)=>{
 const Id =req.params.id
  const blogbyId = await mongoose.blogModel.findById(req.params.id)
res.json(blogbyId)
console.log(blogbyId)
}