import express from 'express';
import { CreateUser, GetUserbyId, deleteUser, getAllUsers, updateUser, userLogin,upload, followuser, getUsersCountByRole } from '../Controllers/UserControllers.js';

import {auth,authorizeAdmin} from  '../middleware/auth.js';
const router = express.Router()

router.post('/register',upload.single('image'),CreateUser)
router.get('/:UserId',auth,authorizeAdmin,GetUserbyId)
router.get('/',auth,authorizeAdmin,getAllUsers)
router.delete('/:UserId',auth,authorizeAdmin,deleteUser)
router.put('/:UserId',updateUser)
router.post('/:userId/follow/:followerId',followuser);
router.post('/login',userLogin)

router.get('/users/count-by-role',getUsersCountByRole)

export default router;   