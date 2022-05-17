import './App.css';

import {
  
  Routes,
  Route,
} from "react-router-dom";
import React, { useState } from 'react';
import  Home  from './components/Home';
import  About  from './components/About';
import  Navbar  from './components/Navbar';

import NoteState from './context/notes/NoteState';
import  Alert  from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
      <NoteState>

      
      <Navbar />
      <Alert alert={alert}/>
      <div className="container">

        <Routes>
          <Route exact path="/note" element={<Home showAlert={showAlert}/>} />
          <Route exact path="/" element={<About/>} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          
        </Routes>
      </div>
        </NoteState>
      

    </>


   
  );
}


export default App;
