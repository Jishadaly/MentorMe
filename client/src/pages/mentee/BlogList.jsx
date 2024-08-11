import React, { useEffect, useState } from 'react';
import { getBlogs } from '@/Api/services/menteeService';
import { useNavigate } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import BlogCard from '@/componets/BlogCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import BlogCardSkelton from './blog/BlogCardSkelton';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);

  const expectedPageSize = 4;

  const fetchBlogs = async (index) => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(async () => {
          const res = await getBlogs(`user/getAllblogs`, index);
          resolve(res);
        }, 2500); 
      });
      return response;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  };

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

  const viewBlog = (blogId) => {
    navigate(`/mentee/blogView/${blogId}`);
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 font-inter text-gray-900">Design Tools</h1>
        <p className="text-center text-gray-600 mb-12 font-inter">A description of the respective category goes right here. Be as expressive as possible, but in brief.</p>
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<div className="flex items-center justify-center h-full mt-5">
            <ReactLoading type="cylon" color="#4338CA" height={50} width={50} />
          </div>}
          endMessage={<p className="flex items-center justify-center h-full mt-5 font-inter ">Catch up all</p>}
        >
          <div className="space-y-8">
            {loading && index === 0
              ? Array.from({ length: blogs.length }).map((_, index) => (
                  <BlogCardSkelton index={index}/>
                ))
              : blogs.map((blog, index) => (
                  <BlogCard
                    key={blog._id}
                    index={index}
                    image={blog.image}
                    title={blog.title}
                    handleBlogClick={viewBlog}
                    date={blog.createdAt}
                    summary={blog.summary}
                    createrName={blog.mentor.userName}
                    createrProfileImage = {blog.mentor.profilePic}
                    blogId={blog._id}
                  />
                ))}
           
          </div>
        </InfiniteScroll>
      </main>
    </div>
  );
}

export default BlogList;