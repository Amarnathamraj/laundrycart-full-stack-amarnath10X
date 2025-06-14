// const express=require('express')
// const userCollection = require('../server/model/user')
// const app=express()
// const router=express.Router()

// router.get('/',async(req,res)=>{
//     const users=await userCollection.find()
//     res.json({
//         status:'success',
//         users
//     })
// })

// router.get('/:id',async(req,res)=>{
//     try{
//       const user=await userCollection.findById(req.params.id)
//       if(user){
//        return res.status(201).json({
//             status:'user found',
//             user
//         })
//       }
//     }
//     catch(err){
//     return res.status(401).json({
//         status:'user not found'
//     })
//     }
// })

// //put
// router.put('/:id',async(req,res)=>{
//     try{
//         const updateduser=await userCollection.findByIdAndUpdate(
//             req.params.id,
//             {
//                 name:req.body.name,
//                 email:req.body.email,
//                 password:req.body.password
//             }
//         )
//         res.status(200).json({
//             status:'updated succesfully',
           
//         })
//     }
//     catch(err){
// return res.status(500).json({
//     status:"failed",
//     message:err.message
// })
//     }
// })

// //delete
// router.delete('/:id',async(req,res)=>{
//     try{
// const deleteuser=await userCollection.findByIdAndDelete(req.params.id)
// if(deleteuser){
//     return res.status(200).json({
//         status:'deleted user',
//         deleteuser
//     })
// }
//     }
//     catch(err){
// return res.status(500).json({
//     status:'failed to delter'
// })
//     }
// })
// module.exports=router;