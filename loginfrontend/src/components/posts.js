// import React, { useEffect, useState } from "react";
// import axios from "axios";
// function Posts({token}){
// const [postData,setPostData]=useState({
//     title:'',
//     body:''
// })
// const [posts,setposts]=useState([])
// //const token = localStorage.getItem('token');
// useEffect(()=>{
//     if(token){
//         axios.get('http://localhost:5000/api/v1/posts',{
//             headers:{Authorization:token}
//         })
//         .then((res)=>{
//             setposts(res.data.posts)
//             console.log(res)
//             console.log(res.data)
//             console.log(res.data.posts)
//         })
        
//     }
    
// },[token])

// const handlesubmit=async(e)=>{
// e.preventDefault()
// try{
// const res=await axios.post('http://localhost:5000/api/v1/posts',postData,{
//     headers:{Authorization:token}
// })
// alert('post suucesful')
// console.log(res)
// console.log(res.data)
// console.log(res.data.posts)
// setposts([...posts,res.data.posts])
// //console.log(res.data)
// }
// catch(err){
// console.log('cant post data',err)
// }
// }
// return<div>
//     <h1>Post data</h1>
//     <form onSubmit={handlesubmit}>
//     <label>title:
//         <input type="text"
//         value={postData.title}
//         onChange={(e)=>{
//              setPostData({
//                 ...postData,
//                 title:e.target.value
//              })
//         }}/>
//     </label>
//     <label>Body:
//         <input type="text"
//         value={postData.body}
//         onChange={(e)=>{
//            setPostData({...postData,body:e.target.value})
//         }}/>
//     </label>
//     <button type="submit">createpost</button>
//     </form>
//    <h2>your posts</h2>
//    {
//     posts.map((post,index)=>{
//         return <div key="index">
//       <h3>{post.title}</h3>
//       <p>{post.body}</p>
//         </div>
//     })
//    }
// </div>
// }
// export default Posts;