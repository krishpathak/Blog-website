const express = require('express');
const router = express.Router();
const db = require('../db');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Krishkrishpathak@happend#';
// Get all products

router.get('/', async (req, res) => {
  try {
    const q = req.query.cat ? 'SELECT * FROM posts WHERE cat=?' : 'SELECT * FROM posts';
    const post = db.query(q, [req.query.cat], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const post = db.query('SELECT * FROM posts WHERE id=?', [req.params.id], (err, result) => {
      if (err) throw err;
      res.json(result[0]);
    });

  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/delete/:id', (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).send("Not authenticated");
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({message:'Access denied'});
    const q = 'DELETE FROM posts WHERE id=?';
    db.query(q, [req.params.id], (err, result) => {
      if (err) throw res.status(404).json({ message: err });
      res.status(200).json({ message: 'Post deleted successfully' })
    })
  })

});

router.post('/write',(req,res)=>{
    const q="INSERT INTO posts ( `title`, `description`, `date`, `img`, `cat`, `uid`) VALUES (?,?,?,?,?,?)"
    const value=[
      req.body.title,
      req.body.description,
      new Date(),
      req.body.img,
      req.body.cat,
      req.body.uid
    ]
    db.query(q,value,(err,result)=>{
        if(err) throw err;
        res.status(201).json({message:'Post created successfully'})
    })
})

router.put('/update',(req,res)=>{
  const q = "UPDATE posts SET title=?, description=?, date=?, img=?, cat=? WHERE id=?"
  const value=[
    req.body.title,
    req.body.description,
    new Date(),
    req.body.img,
    req.body.cat,
    req.body.id
  ]
  db.query(q,value,(err,result)=>{
    if(err) throw err;
    res.status(200).json({message:'Post updated successfully'})
  })
})

module.exports = router;