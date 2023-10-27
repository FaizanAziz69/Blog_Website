import express  from 'express';
import { CreateBlog, GetBlogbyId, getBlogsByCategoryAggregate, deleteBlog, getAllBlogs, getBlogsByUser, getBlogsOfFollowingUsers, publicBlogs, updateBlog, viewblog } from '../Controllers/blogsControllers.js';
import { likeblog } from '../Controllers/sentimentController.js';




const app = express.Router()

app.post('/blog/:userId', CreateBlog)
app.get('/blogId/:blogId',GetBlogbyId)
app.get('/Allblog',getAllBlogs,likeblog)
app.get('/Userblogs/:UserId',getBlogsByUser)
app.get('/blog/:category',getBlogsByCategoryAggregate)
app.get('/confidentialblog',publicBlogs);
app.get('/following/:userId',getBlogsOfFollowingUsers)
app.delete('/blog/:blogId',deleteBlog)
app.put('/blog/:blogId',updateBlog)
app.post('/blogs/:id/views',viewblog)


export default app;