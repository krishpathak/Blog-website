import React, { useState } from 'react'
import './register.scss'

const Register = () => {

  const [value, setValue] = useState({});

  const handleClick=(e)=>{
    e.preventDefault()
    const url='https://blog-website-cyan-seven.vercel.app/auth/register'
    const saveData=async ()=>{
      const res=await fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include'
        },
        body: JSON.stringify(value),
      })
      const response=await res.json();
      console.log(response)
    }
    saveData();
  }

  const handleChange = (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
      console.log(value)
  };
  return (
    <div className='auth'>
  <div className='box'>
    <div className='l-side1'>
      <div className='form-container'>
        <form>
        <h1>Register</h1>
          <input type='text' placeholder='Username' name='username' id='username' onChange={handleChange}/>
          <input type='text' placeholder='Email' name='email' id='email' onChange={handleChange}/>
          <input type='password' placeholder='Password' name='password' id='password' onChange={handleChange}/>
          <button type='submit' onClick={handleClick}>Register</button>
          <div>
            Already have an account? <a href='/login'>Login</a>
          </div>
        </form>
      </div>
    </div>
    <div className='r-side'>
      <img
        src='https://images.pexels.com/photos/3783385/pexels-photo-3783385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=500&dpr=1'
        alt='Register Image'
      />
    </div>
  </div>
</div>

  )
}

export default Register
