import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

function PersonalBlog({ searchTerm }) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const handleReadMore = (blogId) => {
    console.log(blogId);
    navigate(`/personal-blog/${blogId}`);
  };
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token'); 
        console.log(token)
        const apiUrl = searchTerm
          ? `${API_URL}/blog/blogs/search/?q=${searchTerm}`
          : `${API_URL}/blog/profile/blogs/`;

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `JW ${token}`, // Assuming 'JW' is the prefix, replace with the correct prefix
            'Content-Type': 'application/json',
          },
        });

        // Check if the response status is OK (200)
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBlogs(data.data);
        } else {
          // Handle non-OK responses, e.g., unauthorized
          console.error('Error fetching blogs. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [searchTerm]);

  const handleCreateBlog = () => {
    // Redirect to the create blog page
    navigate('/create-blog');
  };


  return (
    <div className="py-10 px-8 xl:px-12 2xl:px-28 3xl:px-[22rem] bg-white mt-14 sm:mt-10" >
      <h1 className="flex justify-center items-center text-slate-900 text-xl xl:text-4xl font-semibold font-roboto mb-5">
        Personal Blogs
      </h1>
      <div className='flex justify-center item-center'>
      <button
        className="bg-blue-500 text-white rounded-md px-4 py-2 mb-5 focus:outline-none "
        onClick={handleCreateBlog}
      >
        Create New Blog
      </button>
      </div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-8  mt-8 shadow-sm rounded-lg ">
        {blogs.map(blog => (
          <div key={blog.id} className="flex flex-col md:flex-row   rounded-xl md:space-x-8 bg-stone-100 shadow-gray-400">
            <img className="w-[20rem] rounded-lg bg-gray-300" src={`${API_URL}${blog.banner}` || 'https://img.freepik.com/free-photo/teamwork-making-online-blog_53876-94868.jpg?w=740&t=st=1708758855~exp=1708759455~hmac=fac13dc445abed1246ffd83debfee0b086a5369327499a4818d65d227f22ad36'}  alt="Upload your banner image" />

            <div>
              <p>total views: {blog.total_views}</p>
              <div className="flex flex-row pt-2 items-center mb-3 ">
        
                <p className="text-zinc-800 text-sm font-medium font-roboto">
                  Author Name: {blog.author_username}
                </p>
            
              </div>
              <h1 className="text-zinc-800 text-lg  font-semibold font-roboto mb-3">
                Catagory: {blog.category}
              </h1>
              <h1 className="text-zinc-800 text-lg  font-semibold font-roboto mb-3">
                Title: {blog.title}
              </h1>
              <div> 
              {blog.details.split(' ').slice(0, 50).join(' ')}
              {blog.details.split(' ').length > 50 && '...'}
              </div>
              <a className="inline-flex items-center" onClick={() => handleReadMore(blog.id)} role="button">
                <p className="text-slate-600 text-xl font-medium font-roboto mr-1">
                  read more
                </p>
                <svg className="w-6" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.1359 13.0828L14.2862 8.23307C14.0626 8.00151 13.9388 7.69137 13.9416 7.36945C13.9444 7.04753 14.0735 6.73959 14.3012 6.51195C14.5288 6.28431 14.8367 6.15519 15.1587 6.15239C15.4806 6.14959 15.7907 6.27335 16.0223 6.497L22.9678 13.4425C23.0822 13.5563 23.173 13.6915 23.235 13.8405C23.2969 13.9895 23.3288 14.1492 23.3288 14.3106C23.3288 14.4719 23.2969 14.6317 23.235 14.7806C23.173 14.9296 23.0822 15.0649 22.9678 15.1786L16.0223 22.1242C15.909 22.2414 15.7735 22.3349 15.6238 22.3993C15.474 22.4636 15.3128 22.4975 15.1498 22.4989C14.9868 22.5003 14.8251 22.4693 14.6742 22.4075C14.5233 22.3458 14.3863 22.2546 14.271 22.1394C14.1557 22.0241 14.0645 21.887 14.0028 21.7361C13.9411 21.5852 13.91 21.4236 13.9114 21.2605C13.9128 21.0975 13.9467 20.9364 14.0111 20.7866C14.0754 20.6368 14.1689 20.5013 14.2862 20.3881L19.1359 15.5384H7.36645C7.04082 15.5384 6.72853 15.409 6.49828 15.1787C6.26803 14.9485 6.13867 14.6362 6.13867 14.3106C6.13867 13.9849 6.26803 13.6727 6.49828 13.4424C6.72853 13.2121 7.04082 13.0828 7.36645 13.0828H19.1359V13.0828Z" fill="#475569" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PersonalBlog;
