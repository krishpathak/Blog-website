import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Register from './pages/Register/Register';
import Home from './pages/Home';
import Write from './pages/Write';
import Single from './pages/Single';
import Login from './pages/Logn/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import New1 from './pages/new';
import Edit from './pages/Edit';

function App() {
  const {isAuthenticated}= useContext(AuthContext);
  console.log(isAuthenticated)
 
  const[id,setid]= useState();
  const[edit,setedit]=useState();

  return (
    <div className='app'>
      <div className='container'>
        <Router>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} /> 
            <Route >
              <Route path="/home" element={<Home setid={setid}/>} />
              <Route path="/write" element={<Write />} />
              <Route path="/single/:id" element={<Single id={id} setedit={setedit}/>} />
              <Route path='/edit/:id' element={<Edit edit={edit}/>}/>
            </Route>
          </Routes>
        </Router>

      </div>
    </div>
  );
}

export default App;
