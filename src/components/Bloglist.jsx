import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

function BlogList({ searchTerm }) {
  const [bookmarks, setBookmarks] = useState({}); 
  const [blogs, setBlogs] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState({}); // Initialize to an empty object
  const navigate = useNavigate();
  const handleReadMore = (blogId) => {
    console.log(blogId);
    navigate(`/blogdetails/${blogId}`);
  };
  const toggleBookmark = async (blogId) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = `${API_URL}/blog/bookmark/${blogId}/`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `JW ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        
        setBookmarkStatus(prevStatus => ({
          ...prevStatus,
          [blogId]: !prevStatus[blogId], 
        }));
      } else {
        console.error('Error toggling bookmark status. Status:', response.status);
      }
    } catch (error) {
      console.error('Error toggling bookmark status:', error);
    }
  };
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token'); 
        const apiUrl = searchTerm
          ? `${API_URL}/blog/blogs/search/?q=${searchTerm}/`
          : `${API_URL}/blog/blogs/`;

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
          
          // Fetch initial bookmark status for each blog
          const initialBookmarkStatus = {};
          for (const blog of data.data) {
            const bookmarkUrl = `${API_URL}/blog/bookmark/${blog.id}/`;
            const bookmarkResponse = await fetch(bookmarkUrl, {
              method: 'GET',
              headers: {
                'Authorization': `JW ${token}`, 
                'Content-Type': 'application/json',
              },
            });
            if (bookmarkResponse.ok) {
              const bookmarkData = await bookmarkResponse.json();
              console.log("monn",bookmarkData);
              initialBookmarkStatus[blog.id] = bookmarkData.bookmark;
              console.log("monn",initialBookmarkStatus)
            } else {
              console.error('Error fetching bookmark status. Status:', bookmarkResponse.status);
            }
          }
          setBookmarkStatus(initialBookmarkStatus);
        } else {
          console.error('Error fetching blogs. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [searchTerm]);


  return (
    <div className="py-10 px-8 xl:px-12 2xl:px-28 3xl:px-[22rem] bg-white mt-14 sm:mt-10" >
      <h1 className="flex justify-center items-center text-slate-900 text-xl xl:text-4xl font-semibold font-roboto mb-5">
        Blogs
      </h1>

      <div className="grid grid-cols-1 gap-y-10 gap-x-8  mt-8 shadow-sm rounded-lg bg-white ">
        {blogs.map(blog => (
          <div key={blog.id} className="flex flex-col md:flex-row rounded-xl md:space-x-8 bg-stone-100 shadow-gray-400">
            <img className="w-[20rem] rounded-lg bg-gray-300" src={`${API_URL}${blog.banner}` || 'https://img.freepik.com/free-photo/teamwork-making-online-blog_53876-94868.jpg?w=740&t=st=1708758855~exp=1708759455~hmac=fac13dc445abed1246ffd83debfee0b086a5369327499a4818d65d227f22ad36'}  alt="" />
             
            <div>
              <p>total views: {Math.ceil(blog.total_views / 2)}</p>
              <div className="flex flex-row pt-2 items-center mb-3 ">
        
                <p className="text-zinc-800 text-sm font-medium font-roboto">
                  Author Name: {blog.author_username}
                </p>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className={`h-6 w-6 ml-2 cursor-pointer`}
                onClick={() => toggleBookmark(blog.id)}
              >
                <path 
                  d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"
                  fill={bookmarkStatus[blog.id] ? 'yellow' : 'currentColor'} 
                />
              </svg>

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
                 
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BlogList;
