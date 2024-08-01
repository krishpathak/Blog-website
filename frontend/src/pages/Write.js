import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Write = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [catagory, setCatagory] = useState('');
    const[imgUrl,setimgurl]=useState('')
    const uid=localStorage.getItem("uid")

    const handleclick = async (e) => {
        e.preventDefault();
        const upload = async () => {
            const data = new FormData();
            data.append('image', img);
    
            try {
                const url = 'http://localhost:8000/auth/upload';
                const response = await fetch(url, {
                    method: 'POST',
                    body: data
                });
    
                const result = await response.json();
                setimgurl(result.file);
                console.log(imgUrl)
            } catch (e) {
                console.error('Upload error:', e);
            }
        }
        upload();
    }
    const handleOnClick=async ()=>{
        const url='http://localhost:8000/post/write'
        const postData=async()=>{
            try{
                const response=await fetch(url,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        title:title,
                        description:value,
                        img:imgUrl,
                        cat:catagory,
                        uid:uid,
                    })
                })
                const data=await response.json()
                console.log(data)
            }catch(error){
                console.error('Error:',error)
            }
        }
        postData();
        window.location.href='/home'
    }
    return (
        <>
            <Navbar />
            <>
                <div className='write'>
                    <div className='content'>
                        <h1>Write your post</h1>
                        <div className='forTitle'>
                            <input type='text' placeholder='Title' id='title' onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className='editorContainer'>
                            <textarea value={value} onChange={e=>setValue(e.target.value)} className='editor' placeholder='Write your description' />
                        </div>
                    </div>
                    <div className='menu'>
                        <div className='item'>
                            <h1>Publish</h1>
                            <span>
                                <b>Status: </b>Draft
                            </span>
                            <span>
                                <b>Visiblity: </b>Public
                            </span>
                            <input type='file' style={{ display: 'none' }} id='file' name='' className='input' onChange={e => setImg(e.target.files[0])} />
                            <label htmlFor='file' >Upload Image</label>
                            <div className='button'>
                                <button className='draft'>Save as draft</button>
                                <button className='upload' onClick={handleclick}>Upload</button>
                            </div>
                        </div>
                        <div className='catagory'>
                            <h1>Catagory</h1>
                            <div className='catagoryList'>
                                <div className='cat'>
                                    <input type='radio' name='cat' value='technology' id='technology' onChange={e => setCatagory(e.target.value)}></input>
                                    <label htmlFor='technology'>Technology</label></div>
                                <div className='cat'>
                                    <input type='radio' name='cat' value='art' id='art' onChange={e => setCatagory(e.target.value)}></input>
                                    <label htmlFor='art'>Art</label>
                                </div>
                                <div className='cat'>
                                    <input type='radio' name='cat' value='cinemaa' id='cinema' onChange={e => setCatagory(e.target.value)} ></input>
                                    <label htmlFor='technology'>Cinema</label>
                                </div>
                                <div className='cat'>
                                    <input type='radio' name='cat' value='science' id='science' onChange={e => setCatagory(e.target.value)}></input>
                                    <label htmlFor='science'>Science</label>
                                </div>
                                <div className='cat'>
                                    <input type='radio' name='cat' value='food' id='food' onChange={e => setCatagory(e.target.value)}></input>
                                    <label htmlFor='food'>Food</label>
                                </div>
                                <div className='cat'>
                                    <input type='radio' name='cat' value='design' id='design' onChange={e => setCatagory(e.target.value)}></input>
                                    <label htmlFor='desiign'>Design</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={handleOnClick} className='upload'>Submit</button>
            </>
            <Footer />
        </>
    )
}

export default Write
