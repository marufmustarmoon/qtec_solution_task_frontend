import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API_URL from '../config';

function PersonalBlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    details: '',
    bannerImage: null, 

    
  });

  useEffect(() => {
    const fetchBlogById = async (blogId) => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = `${API_URL}/blog/profile/blogs/${blogId}`;

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `JW ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBlog(data); // Set the individual blog in state
          // Set form data with the fetched blog data
          setFormData({
            title: data.title,
            category: data.category,
            details: data.details,
            // Update with more fields as needed
          });
        } else {
          console.error('Error fetching blog. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlogById(id); // Use the 'id' parameter from useParams

  }, [id]); // Include 'id' in the dependencies array

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = `${API_URL}/blog/profile/blogs/${id}/`;

      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Authorization': `JW ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Blog updated successfully!');
        navigate('/personal-blog');
      } else {
        console.error('Error updating blog. Status:', response.status);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = `${API_URL}/blog/profile/blogs/${id}/`;

      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `JW ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Blog deleted successfully!');
        // Redirect to the personal blog page after successful deletion
        navigate('/personal-blog');
      } else {
        console.error('Error deleting blog. Status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
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
      {blog && (
        <div className="px-10 md:px-16 xl:px-32 2xl:px-60 3xl:px-[28rem] mt-48 sm:mt-40"> 
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
            {blog.banner && (
                <img
                  src={`${API_URL}${blog.banner}`}
                  alt="Banner Image"
                  className="w-40 h-40 mb-4"
                />
              )}

              {/* Default image if no banner is uploaded */}
              {!blog.banner && (
                <img
                  src="https://img.freepik.com/free-photo/teamwork-making-online-blog_53876-94868.jpg?w=740&t=st=1708758855~exp=1708759455~hmac=fac13dc445abed1246ffd83debfee0b086a5369327499a4818d65d227f22ad36"
                  alt="Default Banner Image"
                  className="w-40 h-40 mb-4"
                />
              )}
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

            {/* Add more input fields as needed */}

            <div className="flex justify-center gap-6">
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PersonalBlogDetails;
