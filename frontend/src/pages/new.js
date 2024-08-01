import React, { useState } from 'react'

const New1 = () => {
    const[img,setimg]=useState()
        const upload=()=>{
        const url="https://blog-website-cyan-seven.vercel.app/auth/upload";
        const uploadfile=async()=>{
            const formData=new FormData();
            formData.append('image',img);
            console.log(formData)
            const response=await fetch(url,{
                method:'POST',
                body:formData
            });
            const result= await response.json();
            console.log(result)
        }
        uploadfile();
    }
  return (
    <div>
      <input type='file' onChange={e=>setimg(e.target.files[0])}></input>
      <button onClick={upload}>Upload</button>
    </div>
  )
}

export default New1
