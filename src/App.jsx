import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'; 
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import BlogDetails from './pages/BlogDetails'; 
import Personal from './pages/Personal';
import PersonalBlogDetails from './pages/PersonalBlogDetails';
import CreatePersonalBlog from './pages/CreatePersonalBlog';


function App() {
  



 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogdetails/:id" element={<BlogDetails />} />
        <Route path="/personal-blog" element={<Personal />} />
        <Route path="/personal-blog/:id" element={<PersonalBlogDetails />} />
        <Route path="/create-blog" element={<CreatePersonalBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
