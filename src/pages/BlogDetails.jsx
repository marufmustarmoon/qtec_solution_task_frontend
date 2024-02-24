import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API_URL from '../config';


function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [bookmarkStatus, setBookmarkStatus] = useState({});

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
       
      }
    } catch (error) {
     
    }
  };
  

  useEffect(() => {
    const fetchBlogById = async (blogId) => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = `${API_URL}/blog/blogs/${blogId}/`;

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `JW ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          
          setBlog(data);
          const initialBookmarkStatus = {};
         
         
            const bookmarkUrl = `${API_URL}/blog/bookmark/${data.id}/`;
            const bookmarkResponse = await fetch(bookmarkUrl, {
              method: 'GET',
              headers: {
                'Authorization': `JW ${token}`, 
                'Content-Type': 'application/json',
              },
            });
            if (bookmarkResponse.ok) {
              const bookmarkData = await bookmarkResponse.json();
              initialBookmarkStatus[data.id] = bookmarkData.bookmark;
              
            } else {
            }
          
          setBookmarkStatus(initialBookmarkStatus); 
        } else {
         
        }
      } catch (error) {
        
      }
    };

    fetchBlogById(id); // Use the 'id' parameter from useParams

  }, [id]); // Include 'id' in the dependencies array


  return (
    <div >
       <Navbar/>
      {blog && (
          <div className="px-10 md:px-16 xl:px-32 2xl:px-60 3xl:px-[28rem] mt-28">
          <div className='flex justify-start items-center flex-row'>
          <h1 className="font-roboto font-bold text-3xl md:text-5xl text-slate-900">{blog.title}</h1>
          <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className={`h-8 w-8 ml-5 mt-2 cursor-pointer`}
                onClick={() => toggleBookmark(blog.id)}
              >
                <path 
                  d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"
                  fill={bookmarkStatus[blog.id] ? 'yellow' : 'currentColor'} // Dynamically set the fill color based on bookmarkStatus
                />
              </svg>
            </div>
          <p>total views: {Math.ceil(blog.total_views / 2)}</p>
      
          <div className="inline-flex items-center mt-5">
            
              <img className="h-16 mr-3 rounded-full" src="https://cdn0.iconfinder.com/data/icons/leto-ui-generic-1/64/leto-04-256.png" alt="" />
            <div>
              <h1 className="font-roboto font-medium text-xl md:text-2xl text-slate-900">{blog.author_username}</h1>
              <p className="font-roboto font-normal text-sm text-slate-600">
                Category: {blog.category} 
              </p>
            </div>
          </div>
      
          <hr className="md:mt-5" />
      
      
                <hr className="mt-5" />
      
                <div className="flex flex-col items-center mt-5">
                  
                {blog.banner && (
                <img
                  src={`${API_URL}${blog.banner}`}
                  alt=""
                  className="h-[15rem] sm:h-[26rem] xl:h-[38rem] rounded"
                />
              )}

             
              {!blog.banner && (
                <img
                  src="https://img.freepik.com/free-photo/teamwork-making-online-blog_53876-94868.jpg?w=740&t=st=1708758855~exp=1708759455~hmac=fac13dc445abed1246ffd83debfee0b086a5369327499a4818d65d227f22ad36"
                  alt=""
                  className="h-[15rem] sm:h-[26rem] xl:h-[38rem] rounded"
                />
              )}
                </div>
      
                <div className="font-roboto mt-10 mb-32"  >{blog.details}</div>
              </div>
      )}
    </div>
  );
}

export default BlogDetails;
