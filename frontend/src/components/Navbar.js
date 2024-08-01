import React, { useContext,useEffect, useState } from 'react'
import '../App.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { IoReorderThree } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
const Navbar = () => {
  // const {isAuthenticated}=useContext(AuthContext);
  const[query,setquery]=useState()
  const name= localStorage.getItem('access_token1');
  const uid=localStorage.getItem("uid")
  

  // useEffect(() => {
  //   console.log('isAuthenticated:', isAuthenticated);
  //   console.log('isAuthenticated === null:', isAuthenticated == undefined);
  // }, [isAuthenticated]);
  const { logout } = useContext(AuthContext)
  
  const handleclick = () => {
    const dropdown = document.querySelector('.links');
    const computedStyle = window.getComputedStyle(dropdown);
    const icon= document.querySelector('.icon');
    const icon1= document.querySelector('.icon1')
    if (computedStyle.display === 'none') {
      dropdown.style.display = 'block';
      icon.style.display='none';
      icon1.style.display='block';
      console.log(dropdown.style.display);
    } else {
      dropdown.style.display = 'none';
      icon.style.display='block';
      icon1.style.display='none';
      console.log(dropdown.style.display);
    }
  };
  window.addEventListener('resize', () => {
    const dropdown = document.querySelector('.links');
    const icon= document.querySelector('.icon');
    const icon1= document.querySelector('.icon1')
    dropdown.style.display = ''; 
    icon.style.display='';
    icon1.style.display='';
  });

  const logout1 = () => {
    logout();
    localStorage.removeItem('access_token1');
    localStorage.removeItem('uid')
    window.location.href = '/login'
  }
  return (
    <div className='navbar'>
      <div className='container'>
        <Link className='/home'>
        <div className='logo'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMAs05u9PYfgo7hbHpetcTrC9M466Zvk74lw&s'></img></div></Link>
        <ul className='links'>
          <li><Link to='/home/?cat=art'>ART</Link></li>
          <li><Link to='/home/?cat=science'>SCIENCE</Link></li>
          <li><Link to='/home/?cat=technology'>TECHNOLOGY</Link></li>
          <li><Link to='/home/?cat=food'>FOOD</Link></li>
          <li><Link to='/home/?cat=design'>DESIGN</Link></li>
          <li><Link to='/home/?cat=cinema'>CINEMA</Link></li>
        </ul>
        <IoReorderThree className='icon' onClick={handleclick}/>
        <MdCancel className='icon1' onClick={handleclick} />
        {name? (
          <>
            <span className='loger'>{name}</span>
            <span onClick={logout1} className='login'>Logout</span>
          </>
        ) : (
          <Link to='/login'>
            <span className='login'>Login</span>
          </Link>
        )}
        
        {uid?
        <Link to='/write'>
          <span className='write'>
            Write
          </span></Link>:<span></span>}
      </div>
    </div>
  )
}

export default Navbar
