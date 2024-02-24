import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API_URL from '../config';


function BlogDetails() {

  
  const { id } = useParams();
  console.log(id)
  return (
    <div>moon</div>
  )}
  

export default BlogDetails;
