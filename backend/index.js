require('dotenv').config();
const express =require('express');
const app=express()
const cors=require('cors');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cors({origin: 'http://localhost:3001,https://blog-website-client-lovat.vercel.app',credentials: true}));
app.use(cookieParser());
app.get("/",(req,res)=>{
    res.send("server is running")
})
//Routes
app.use('/auth',require('./routes/auth'));
app.use('/post',require('./routes/post'))

const port =process.env.PORT||8000
console.log(process.env.PASSWORD)
app.listen(8000,()=>{
    console.log(`Server listening on port ${port}`)
})