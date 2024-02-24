import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

function Navbar({ onSearch }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthor, setIsAuthor] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = `${API_URL}/blog/isAuthor`;  // Replace with your actual user details API endpoint

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `JW ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthor(data.isAuthor);
          setUsername(data.username);  // Assuming the response has a 'username' field
        } else {
          console.error('Error fetching user details. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setSearchTerm('');
    navigate('/login');
  };

  const handleSearchOnChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };
  

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center fixed w-full z-10 top-0">
      <div className="flex items-center hover:cursor-pointer">
        <span className="text-white font-bold text-lg mr-4 " onClick={() => {
              navigate('/'); }}>Qtec Solution</span>
      </div>

      <div className="flex items-center justify-center flex-grow">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-700 text-white rounded-md w-20 sm:w-64 sm:px-4 py-2 text-center items-center focus:outline-none"
          value={searchTerm}
          onChange={handleSearchOnChange}
        />
      </div>
      
   
      <div className="relative flex items-center">
        {isAuthor && (
          <button
            className="text-white mr-4"
            onClick={() => {
              navigate('/personal-blog');
            }}
          >
            Your Blogs
          </button>
        )}

        <div className="flex items-center cursor-pointer" onClick={() => setDropdownOpen(!isDropdownOpen)}>
          <span className="text-white mr-2">{username}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="rounded-full h-8 w-8"
          >
            <g id="info" />
            <g id="icons">
              <g id="user">
                <ellipse cx="12" cy="8" rx="5" ry="6" />
                <path d="M21.8,19.1c-0.9-1.8-2.6-3.3-4.8-4.2c-0.6-0.2-1.3-0.2-1.8,0.1c-1,0.6-2,0.9-3.2,0.9s-2.2-0.3-3.2-0.9C8.3,14.8,7.6,14.7,7,15c-2.2,0.9-3.9,2.4-4.8,4.2C1.5,20.5,2.6,22,4.1,22h15.8C21.4,22,22.5,20.5,21.8,19.1z" />
              </g>
            </g>
          </svg>

        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-32 bg-white rounded-md shadow-md">
            <ul className="py-2">
              <li className="px-2 py-2 cursor-pointer" onClick={handleLogout}>
                Logout
              </li>
              {/* Add more dropdown options if needed */}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}


export default Navbar;
