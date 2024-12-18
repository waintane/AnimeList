import React, {Key, useEffect, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import Accueil from "./pages/accueil/Accueil";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import "./App.css";
import Header from './common/header/Header';

type movie = {
  _id: Key
  name: String,
  genre : String,
  description : String,
  image : String
}

function App() {

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Accueil/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
