const express=require('express');
const router =express.Router();
const bcrypt=require('bcrypt')
const db=require('../db');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Krishkrishpathak@happend#';
const multer=require('multer');
const fs = require('fs');
const {storage}=require('../cloudinary/index');
const upload=multer({storage});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname); 
//     }
// });
// const upload = multer({ storage: storage });
router.post('/upload', upload.single('image'), (req, res,err) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg:"File cant be uplaoded"});
        }
        res.status(200).json({ file: req.file.path });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

router.post('/register',(req, res) => {

    //CHEACK EXISTING USER
    const q = "SELECT * FROM user WHERE email=? or username=?"
    db.query(q, [req.body.email, req.body.username], (err, result) => {
        if (err) return res.status(404).json(err);
        if (result.length > 0) {
            return res.status(400).json({ msg: 'User already exists' })
        }


        //HASH PASSWORD
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const q = "INSERT INTO user (`username`, `email`, `password`) VALUES (?, ?, ?)";
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword
        ]
        db.query(q, values, (err, result) => {
            if (err) return res.status(201).send(err);
            res.status(201).json({ msg: 'User registered successfully' })
        })
    })
})

router.post('/login',async (req,res)=>{
    //CHEAK USER EXIST OR NOT
    const q = "SELECT * FROM user WHERE username=?"
    db.query(q, [req.body.username],async (err, result) => {
        if (err) return res.status(404).json(err);
        if (result.length === 0) {
            return res.status(400).json({ msg: 'User not found' })
        }
        else{
        //PASSWORD MATCH
        const isMatch =await bcrypt.compare(req.body.password, result[0].password);
           if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' })
        }
        else{
            //CREATE AND SEND JWT TOKEN
            const payload = { id: result[0].id };
            jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
                if (err) throw err;
                res.cookie("access_token",token,{
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    secure: false,
                    httpOnly: true
                }).json({ message:"okay", token:req.body.username,id:result[0].id});
            });
        }
    }})
        
})

router.post('/logout',(req,res)=>{
    res.clearCookie('access_token',{
        sameSite:'none',
        secure:true
    }).status(200).json({message:'Succesfully has been logged out'})
})

router.get('/find/:id',(req,res)=>{
    const q = "SELECT * FROM user WHERE id=?";
    db.query(q,[req.params.id],(err,result)=>{
        if(err) throw err;
        if(result){
        res.json(result);}
    })
})

module.exports= router;