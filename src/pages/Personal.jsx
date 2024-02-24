// src/pages/Home.js


import Navbar from '../components/Navbar';
import PersonalBlog from '../pages/PersonalBlog';
import React, { useState } from 'react';


// import Footer from '../components/Footer';

function Personal() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    console.log(term)
    setSearchTerm(term);
  };
  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <PersonalBlog searchTerm={searchTerm} />
     
      
      {/* <Footer /> */}
    </div>
  );
}

export default Personal;
