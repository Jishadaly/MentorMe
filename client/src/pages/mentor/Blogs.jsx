import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getMentorBlogs } from '@/Api/services/menteeService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  
  console.log(user);

  const fetchBlogs = async () => {
    try {
      const Blogs = await getMentorBlogs('user/getmentorBlog',user.id);

      setBlogs(Blogs);

    } catch (error) {
      console.error('Error fetching blogs:', error);
    }

  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  const handlClick = (blogId)=>{
     navigate(`/mentor/editBlog/${blogId}`);
  }

 

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="ml-64 mt-16 p-6 flex-1 overflow-y-auto">
        <section className="mb-8">
          <h1 className="text-3xl font-extrabold font-inter">Your Blogs</h1>
          <p className="mt-2 text-gray-600 font-inter">
            Boost expertise & Google ranking with niche blogs. Highlight your knowledge, get noticed, and rank higher. Publish to stand out!
          </p>
          <div className="mt-6">
            <button onClick={()=> navigate('/mentor/createBlogs')} className="px-4 py-2 bg-black text-white rounded-sm font-inter">Create a Blog</button>
          </div>
        </section>

        { blogs ? (  <section className="mb-8">
          <h2 className="text-2xl  font-semibold mb-4 font-inter">Published Blogs</h2>
          {blogs.map((blog) => (
            <div key={blog._id} onClick={()=> handlClick(blog._id) }  className="mb-4 p-4 bg-white rounded-md shadow-md flex cursor-pointer">
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-inter">{new Date(blog.createdAt).toLocaleDateString()}</p>
                <h3 className="text-xl font-semibold font-inter">{blog.title}</h3>
                <p className="mt-2 text-gray-700  font-inter">{blog.summary}</p>
              </div>
              <div className="ml-4">
                <img src={'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'} alt={blog.title} className="w-auto h-32 object-cover rounded-md" />
              </div>
            </div>
          ))}
        </section> ) : ''}

        {/* <section>
          <h2 className="text-2xl font-semibold mb-4 f">Other Mentor Blogs</h2>
          {blogs.map((blog) => (
            <div key={blog._id} className="mb-4 p-4 bg-white rounded-md shadow-md flex">
              <div className="flex-1">
                <p className="text-sm text-gray-600">{new Date(blog.createdAt).toLocaleDateString()}</p>
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="mt-2 text-gray-700">{blog.summary}</p>
                <p className="mt-2 text-gray-500">by {blog.mentor.name}</p>
              </div>
              <div className="ml-4">
                <img src={blog.image} alt={blog.title} className="w-32 h-32 object-cover rounded-md" />
              </div>
            </div>
          ))}
        </section> */}

        
      </main>
    </div>
  );
}

export default Blogs;
