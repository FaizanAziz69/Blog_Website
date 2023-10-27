import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import UserModel from '../models/userSchema.js';


function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); 
      
      jwt.verify(token,config.secertJwt, (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid token' });
        }
    
        req.user = user;
   
        next();
        
      
      });
    } else {
      return res.status(401).json({ error: 'Authentication token is required' });
    }
  }
  function authorizeAdmin(req, res, next) {
    const userrole = UserModel.findOne({id:req.user._id})
   console.log(userrole)
    if (userrole.role !== "admin") {
       return res.status(403).json({ error: 'Access denied' });
     }
     next();
  
   }



export  {auth,authorizeAdmin}



  