import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getMentorBlogs } from '@/Api/services/menteeService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BlogCard from '@/componets/BlogCard';


function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  console.log(blogs);
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

        { blogs && blogs.length > 0 &&  ( 
          <section className="mb-8">
          <h2 className="text-2xl  font-semibold mb-4 font-inter ">Published Blogs</h2>
          {blogs.map((blog , index) => (
            <BlogCard  index={index} image={blog.image} title={blog.title} handleBlogClick={handlClick} date={blog.createdAt} summary={blog.summary} createrName={blog.mentor.userName} blogId={blog._id }  />
          ))}
        </section> ) }

      </main>
    </div>
  );
}

export default Blogs;
