import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
    },
    confidential:{
      type:Boolean,
      default:false
    },
    User: [{ type: mongoose.Schema.Types.Object, ref: 'User',
    name:String,
    email:String
}],
      likes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' ,}],
    views: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String
      }],
})

const blogModel = mongoose.model('blogModel',blogSchema)
export default blogModel;