import './App.css';
import React from 'react';
import Post from './Post';
import Header from './Header';
import {Routes, Route} from "react-router-dom"
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import AdminPage from './pages/AdminPage';
import RegisterPage from './pages/RegisterPage';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          
          <Route path = {'/admin'} element = {<AdminPage/>}/>

          <Route path = {'/register'} element = {<RegisterPage/>}/>
 
      </Route>


    </Routes>
  );
}

export default App;
