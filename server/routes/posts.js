// const express=require('express');
// const Posts = require('../model/post');
// const userCollection = require('../model/user');
// const app=express()
// const router=express.Router();
// // const Posts=require('../model/post')


// router.get('/',async(req,res)=>{
//     const posts=await Posts.find({user:req.user})
//     res.status(200).json({
//         status:'success',
//         posts
//     })
// })

// router.post('/',async(req,res)=>{
//     const posts=await Posts.create({
//         title:req.body.title,
//         body:req.body.body,
//         user:req.user//contains objectid of that user
//     })
//     res.json({
//         status:'success',
//         posts
//        })
// })
// module.exports=router;