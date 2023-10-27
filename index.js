import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import connectDB from './db/connectdb.js';
import UserRoutes from './Routes/UsersRoutes.js';
import blogroutes from './Routes/BlogRoutes.js';
import sentimentRoutes  from './Routes/sentimentRoutes.js'


connectDB()

const app = express()  
const PORT = 5000; 

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/v1/user',UserRoutes)
app.use('/',blogroutes)
app.use('/api/v1/sentiment',sentimentRoutes)


app.listen(PORT, ()=>console.log(`the Server is ruuning on port:http://localhost${PORT}`))
app.get('/',(req,res)=>{
    res.send('hello from home');
})