import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getMentorBlogs } from '@/Api/services/menteeService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BlogCard from '@/componets/BlogCard';
import BlogCardSkelton from '../mentee/blog/BlogCardSkelton';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading , setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);

  const expectedPageSize = 4;


  const user = useSelector((state) => state.auth.user)

  const fetchBlogs = async () => {
    try {
      const Blogs = await getMentorBlogs('user/getmentorBlog', user.id);
      setTimeout(() => { 
        setBlogs(Blogs);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }

  };

  // useEffect(() => {
  //   fetchBlogs();
  // }, []);

  useEffect(() => {
    const loadInitialBlogs = async () => {
      const initialBlogs = await fetchBlogs(0);
      setBlogs(initialBlogs);
      setLoading(false);
      if (initialBlogs.length === 0 || initialBlogs.length < expectedPageSize) {
        setHasMore(false);
      }
    };

    loadInitialBlogs();
  }, []);

  useEffect(() => {
    if (index !== 0) {
      appendBlogs();
    }
  }, [index]);

  const appendBlogs = async () => {
    setLoading(true);
    const newBlogs = await fetchBlogs(index);
    if (newBlogs.length === 0 || newBlogs.length < expectedPageSize) {
      setHasMore(false);
    }
    setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
    setLoading(false);
  };

  const fetchData = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handlClick = (blogId) => {
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
            <button onClick={() => navigate('/mentor/createBlogs')} className="px-4 py-2 bg-black text-white rounded-sm font-inter">Create a Blog</button>
          </div>
        </section>

        {loading ? (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 font-inter">Published Blogs</h2>
            {[...Array(3)].map((_, index) => (
                <BlogCardSkelton key={index} /> 
            ))}
          </section>
        ) : (
          blogs && blogs.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 font-inter">Published Blogs</h2>
              <div className="grid gap-4">
                {blogs.map((blog, index) => (
                  <BlogCard
                    key={blog._id}
                    index={index}
                    image={blog.image}
                    title={blog.title}
                    handleBlogClick={handlClick}
                    date={blog.createdAt}
                    summary={blog.summary}
                    createrName={blog.mentor.userName}
                    blogId={blog._id} />
                ))}
              </div>
            </section>
          )
        )}
      </main>
    </div>
  );
}

export default Blogs;