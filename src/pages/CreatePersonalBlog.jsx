import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API_URL from '../config';

function CreatePersonalBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    details: '',
    bannerImage: null, 
  });


  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = `${API_URL}/blog/profile/blogs/`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `JW ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Blog created successfully!');
        navigate('/personal-blog');
      } else {
        console.error('Error creating blog. Status:', response.status);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='overflow-y-scroll h-screen'>
      <Navbar />
      <div className="px-10 md:px-16 xl:px-32 2xl:px-60 3xl:px-[28rem] mt-20"> 
        <hr className="md:mt-5" />

        <form className="mt-5">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="bannerImage">
              Banner Image
            </label>
            <input
              type="file"
              id="bannerImage"
              name="bannerImage"
              accept="image/*"
              onChange={handleInputChange}
              className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="details">
              Details
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              className="bg-gray-200 appearance-none border rounded w-full h-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            ></textarea>
          </div>

        

          <div className="flex justify-center gap-6">
            <button
              type="button"
              onClick={handleCreate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePersonalBlog;
