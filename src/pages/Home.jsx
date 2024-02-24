// src/pages/Home.js


import Navbar from '../components/Navbar';
import BlogList from '../components/Bloglist';
import React, { useState } from 'react';
import useAuth  from '../components/useAuth';


// import Footer from '../components/Footer';

function Home() {
  useAuth();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    console.log(term)
    setSearchTerm(term);
  };
  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <BlogList searchTerm={searchTerm} />
     
      
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
