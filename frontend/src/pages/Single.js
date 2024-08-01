import React, { useState } from 'react'
import { VscEdit } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from "react";
const Single = ({setedit}) => {
    const location = useLocation();
    const [posts, setPost] = useState([]);
    const [post1, setPost1] = useState({});
    const [author, setauthor] = useState();
    const currentUser= localStorage.getItem('access_token1');

    const edit=()=>{

    }

    const delete1=()=>{
        const id = location.pathname.slice(8)
        const url=`https://blog-website-cyan-seven.vercel.app/post/delete/${id}`

        const deleteData=async ()=>{
            const response=await fetch(url,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
                , credentials: 'include'
            })
            const data= await response.json()
            console.log(data);
        }
        deleteData()
        window.location.href='/home'
    }
    
    useEffect(() => {

        const fetchdata = async () => {
            const response = await fetch(`https://blog-website-cyan-seven.vercel.app/post`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
                , credentials: 'include'
            })
            const data = await response.json()
            setPost(data)
        }
        fetchdata();
        const fetchdata1 = async () => {
            const id = location.pathname.slice(8)
            const response = await fetch(`https://blog-website-cyan-seven.vercel.app/post/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
                , credentials: 'include'
            })
            const data = await response.json()
            setPost1(data)
        }
        fetchdata1();
    }, [])
    useEffect(() => {
        const uid = post1.uid
        const url = `https://blog-website-cyan-seven.vercel.app/auth/find/${uid}`
        const findauthor = async () => {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
                , credentials: 'include'
            })
            const data=await response.json();
            if(data[0]){
            await setauthor(data[0].username)}
        }
        findauthor();
    },[post1])

    const inputDate = new Date(post1.date);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const date = inputDate.toLocaleDateString('en-US', options);
    const moveto = (id) => {
        console.log(id)
        window.location.href = `/single/${id}`
    }
    console.log("istrue",currentUser===author)
    return (
        <>
            <Navbar />
            <div className='single'>
                <div className='container'>
                    <div className='content'>
                        <div className='user-detail'>
                            <img src={post1.img} className='blogphoto' />
                            <div className='user'>
                                <img src='https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img>
                                <div className='info'>
                                    <div className='author'>Posted by {author}</div>
                                    <div className='posted'> Posted on {date}</div>
                                </div>
                                {currentUser===author?<><Link to={`/edit/${post1.id}`}><div className='edit1' onClick={setedit(post1.id)}> <VscEdit className='edit' /></div></Link>
                                <div className='delete1' onClick={delete1}><MdDelete className='delete' /></div></>:''}
                                
                            </div>
                        </div>
                        <h1>{post1.title}</h1>
                        <p>{post1.description}</p>

                    </div>
                    <div className='menu'>
                        <h1>Other blog you may like</h1>
                        {posts.map((post) => {
                            return (
                                <div key={post.id} className='post'>
                                    <img src={post.img} alt={post.title} />
                                    <h2>{post.title}</h2>
                                    <button onClick={() => moveto(post.id)}>Read more</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Single
