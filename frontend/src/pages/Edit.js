import React,{useEffect, useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Edit = ({edit}) => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [catagory, setCatagory] = useState('');
    useEffect(()=>{
        const fetchdata1 = async () => {
            const response = await fetch(`http://localhost:8000/post/${edit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
                , credentials: 'include'
            })
            const data = await response.json()
            setValue(data.description);
            setTitle(data.title);
            setCatagory(data.cat);
            setImg(data.img)
        }
        fetchdata1();
    },[])
    



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
            return result.file
        } catch (e) {
            console.error('Upload error:', e);
        }
    }

    const handleclick = async (e) => {
        e.preventDefault()
        const imgUrl = await upload();
        console.log(imgUrl)
    }
    const handleOnClick=()=>{
        const url="http://localhost:8000/post/update"
        const EditData=async()=>{
            const response=await fetch(url,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id:edit,
                    title:title,
                    description:value,
                    cat:catagory,
                    img:img
                }),
                credentials: 'include'
            })
            const result= await response.json();
            console.log(result)
        }
        EditData();
        window.location.href=`/single/${edit}`;
    }

    return (
        <>
            <Navbar />
            <>
                <div className='write'>
                    <div className='content'>
                        <h1>Write your post</h1>
                        <div className='forTitle'>
                            <input type='text' placeholder='Title' id='title' value={title} onChange={e => setTitle(e.target.value)} />
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
                                    {(catagory==='technology')?<input type='radio' name='cat' value='technology' id='technology' checked onChange={e => setCatagory(e.target.value)}></input>:<input type='radio' name='cat' value='technology' id='technology'  onChange={e => setCatagory(e.target.value)}></input>}
                                    
                                    <label htmlFor='technology'>Technology</label></div>
                                <div className='cat'>
                                    {(catagory==='art')?<input type='radio' name='cat' value='art' id='art' checked onChange={e => setCatagory(e.target.value)}></input>:<input type='radio' name='cat' value='art' id='art' onChange={e => setCatagory(e.target.value)}></input>}
                                    <label htmlFor='art'>Art</label>
                                </div>
                                <div className='cat'>
                                {(catagory==='cinema')?<input type='radio' name='cat' value='cinemaa' id='cinema' checked onChange={e => setCatagory(e.target.value)} ></input>:<input type='radio' name='cat' value='cinemaa' id='cinema' onChange={e => setCatagory(e.target.value)} ></input>}
                                    <label htmlFor='technology'>Cinema</label>
                                </div>
                                <div className='cat'>
                                {(catagory==='science')?<input type='radio' name='cat' value='science' checked id='science' onChange={e => setCatagory(e.target.value)}></input>:<input type='radio' name='cat' value='science' id='science' onChange={e => setCatagory(e.target.value)}></input>}
                                    <label htmlFor='science'>Science</label>
                                </div>
                                <div className='cat'>
                                    {(catagory==='science')?<input type='radio' name='cat' value='food' checked id='food' onChange={e => setCatagory(e.target.value)}></input>:<input type='radio' name='cat' value='food' id='food' onChange={e => setCatagory(e.target.value)}></input>}
                                    <label htmlFor='food'>Food</label>
                                </div>
                                <div className='cat'>
                                {(catagory==='design')?<input type='radio' name='cat' value='design' checked id='design' onChange={e => setCatagory(e.target.value)}></input>:<input type='radio' name='cat' value='design' id='design' onChange={e => setCatagory(e.target.value)}></input>}
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

export default Edit
