import express from "express";
import commentSchema  from "../models/sentimentSchema.js";
import blogModel from "../models/blogSchema.js";
import UserModel from "../models/userSchema.js";

export const commentPost =  async (req, res) => {
  const { blogId,UserId } = req.params;
  console.log(blogId)
  const { content } = req.body;
console.log(content)
  try {
    // Check if the blog exists
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Create a new comment
    const comment = new commentSchema({
       content, blog: blogId , User:UserId
       });
    const savedComment = await comment.save();

    
    blog.comments.push(savedComment);
    await blog.save();

    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}



 export const deletecomment =  async (req, res) => {   
const { blogId, commentId,userId } = req.params;

console.log(userId,"..here is userId")
try {
  
  const blog = await blogModel.findById(blogId);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }


  
  const comment = await commentSchema.findById(commentId);
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  console.log('here is comment',comment)


  console.log(comment.User,'....here is comment.User')
  if (comment.User.toString() !== userId) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  


  blog.comments.pull(commentId);
  console.log(commentId,..."this wil be deleted")
  
  await blog.save();

  await comment.deleteOne();


  res.status(200).json({ message: 'Comment deleted successfully' });
} catch (error) {
  res.status(500).json({ error: 'An error occurred' });
}
};


   export const updatecomment =async (req, res) => {
    const { blogId, commentId,userId } = req.params;
  const content = req.body
  console.log(req.params,req.body,"....here are info")
    try {
      // Check if the blog exists
      const blog = await blogModel.findById(blogId);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  console.log(blog,'....here is blof to be updated')
      // Find the comment by comment ID
      const comment = await commentSchema.findById(commentId);
      console.log(comment,'....here is comment ')
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Check if the user is the author of the comment
      if (comment.User.toString() !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      console.log(comment.User,userId,'.....here is comparison')
  
      // Update the comment content
      comment.content = req.body.content
      console.log(content,'....here is content')
      await comment.save();
  
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };

export  const likeblog =  async (req, res) => {
  try {
    const { blogId, userId } = req.params;

    const blog = await blogModel.findById(blogId)
     const user = await UserModel.findById(userId)
     if (blog.likes.includes(user._id)) {
            return res.status(400).json({ error: 'User already liked the blog' });
          }
   blog.likes.push(user._id);
 
    await blog.save();
 
    return res.json(blog)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
export  const unlikeblog =  async (req, res) => {
  try {
    const { blogId, userId } = req.params;

    const blog = await blogModel.findById(blogId)
     const user = await UserModel.findById(userId)
     
   blog.likes.pop(user._id);
 
    await blog.save();
 
    return res.json(blog)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
 export const avglikes = async(req,res)=>{

 
try {
  const result = await blogModel.aggregate([
    {
      $group: {
        _id: null,
        averageLikes: { $avg: { $size: '$likes' } }
      }
    }
  ]);

  if (result.length === 0) {
    return res.status(404).json({ message: 'No blogs found' });
  }

  res.json(result[0]);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'An error occurred while calculating average likes.' });
}
};

export const mostcommented = async(req,res)=>{


try {
  const mostCommentedBlogs = await blogModel.aggregate([
    {
      $project: {
        _id: 1,
        title: 1,
        numberOfComments: { $size: '$comments' }
      }
    },
    {
      $sort: { numberOfComments: -1 }
    }
  ]).limit(10); // Limiting the result to top 10 most commented blogs
  
  res.json(mostCommentedBlogs);
} catch (error) {
  res.status(500).json({ message: 'Internal server error' });
}
};






