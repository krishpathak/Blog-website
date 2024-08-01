import React, { useContext, useState } from 'react';
import './login.scss'
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [value,setvalue]=useState('');
    const handlechange=(e)=>{
        setvalue({...value,[e.target.name]:e.target.value})
        console.log(value)
    }
    // const {login,isAuthenticated}=useContext(AuthContext);
    const handlesubmit=(e)=>{
        e.preventDefault();
        const url='http://localhost:8000/auth/login'
        const getData=async()=>{
        const res=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            credentials: 'include',
            body:JSON.stringify(value)
        })
        const response=await res.json();
        const {message}= response
        console.log(response.token)
        if(message==='okay'){
            localStorage.setItem('access_token1',response.token);
            localStorage.setItem('uid',response.id)
            window.location.href='/home'
        }

        // login(value);
        // console.log(name===null)
        // if(name!==null){
        //     window.location.href='/home'
        // }
    }
    getData();
    }
    return (
        <div className='auth'>
            <div className='box'>
                <div className='l-side'>
                    <img
                        src='https://images.pexels.com/photos/3783385/pexels-photo-3783385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=500&dpr=1'
                        alt='Login Image'
                    />
                </div>
                <div className='r-side1'>
                    <form>
                    <h1>Login</h1>
                        <input type='text' placeholder='Username' name='username' id='username' onChange={handlechange}/>
                        <input type='password' placeholder='Password' name='password' id='password' onChange={handlechange}/>
                        <button type='submit' onClick={handlesubmit}>Login</button>
                        <div>
                            Don't have an account? <a href='/'>Register</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
