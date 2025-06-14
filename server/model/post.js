const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const postSchema=new Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
  
    user:{type:Schema.Types.ObjectId,ref:"userCollection"}
})
const Posts=mongoose.model('Posts',postSchema)
module.exports=Posts;