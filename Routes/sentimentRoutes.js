import express from 'express'
import { avglikes, commentPost,deletecomment, likeblog, mostcommented, unlikeblog, updatecomment  } from '../Controllers/sentimentController.js'
import { auth } from '../middleware/auth.js'
const web =express.Router()

web.post('/blogs/:blogId/comments/:UserId',commentPost)
web.patch('/blog/:id/like')
web.delete('/blogs/:blogId/comments/:commentId/:userId',auth,deletecomment)
web.put('/blogs/:blogId/comments/:commentId/:userId',auth,updatecomment)
web.put('/blog/:blogId/like/:userId',likeblog)
web.put('/blog/:blogId/unlike/:userId',unlikeblog)
web.get('/blogs/average-likes',avglikes)
web.get('/blogs/most-commented',mostcommented)
export default web;

