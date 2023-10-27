import mongoose from "mongoose";
// const commentSchema = new mongoose.Schema({

const commentSchema = new mongoose.Schema({
  content: String,
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  User:{type: mongoose.Schema.Types.ObjectId,ref:'User',
  name:String,
}} )
const Comment = mongoose.model('Comment', commentSchema);

export default Comment