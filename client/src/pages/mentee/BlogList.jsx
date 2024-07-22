// import React, { useEffect, useState } from 'react';
// import { getBlogs } from '@/Api/services/menteeService';
// import { useNavigate } from 'react-router-dom';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import BlogCard from '@/componets/BlogCard';
// import InfiniteScroll from 'react-infinite-scroll-component';

// function BlogList() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const getAllBlogs = async (index) => {
//         const fetch = async()=>{
//           const datas = await getBlogs('user/getAllblogs',);
//           setBlogs(datas);

//           setLoading(false);
//         }
//     };

//     getAllBlogs(0);
//   }, []);

//   useEffect(() => {
//     if (index !== 0) {
//       appendData();
//     }
//   }, [index])
  
//   const appendUsers = async () => {
//     const response = await getBlogs(`user/getAllblogs`,index);
//     const temp = [...users];
//     const loadedData = response.data;
//     const appended = temp.concat(loadedData);
//     setBlogs(appended);
//   };
  
//   const fetchData = async () => {
//     setIndex((prev) => prev + 1);
//   };

//   const viewBlog = (blogId) => {
//     navigate(`/mentee/blogView/${blogId}`);
//   };

//   const images = [
//     'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
//     'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
//     'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
//     'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
//     'https://images.unsplash.com/photo-1556740749-887f6717d7e4'
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">
//         <h1 className="text-4xl font-extrabold text-center mb-8 font-inter text-gray-900">Design Tools</h1>
//         <p className="text-center text-gray-600 mb-12 font-inter">A description of the respective category goes right here. Be as expressive as possible, but in brief.</p>
//         <div className="space-y-8">
//           {loading
//             ? Array.from({ length: 5 }).map((_, index) => (
//                 <div key={index} className="bg-white dark:bg-gray-100 dark:text-gray-900 rounded-xl overflow-hidden shadow-lg">
//                   <div className="grid grid-cols-12 mx-auto rounded-lg">
//                     <div className="col-span-full lg:col-span-4">
//                       <Skeleton height={300} className="w-full h-full  object-cover rounded-lg lg:rounded-l-lg lg:rounded-none" />
//                     </div>
//                     <div className="flex flex-col p-6 col-span-full lg:col-span-8 lg:p-10 bg-white rounded-lg lg:rounded-r-lg lg:rounded-l-none">
//                       <div className="flex justify-start">
//                         <Skeleton width={80} height={24} className="rounded-full" />
//                       </div>
//                       <Skeleton height={36} width={`80%`} className="mt-2" />
//                       <Skeleton count={3} className="flex-1 pt-2" />
//                       <div className="flex items-center justify-between pt-2">
//                         <div className="flex space-x-2">
//                           <Skeleton circle={true} height={20} width={20} />
//                           <Skeleton width={100} />
//                         </div>
//                         <Skeleton width={50} height={20} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             : blogs.map((blog, index) => (
//                <BlogCard index={index} images={images} title={blog.title} handleBlogClick={viewBlog} date={blog.createdAt} summary={blog.summary} createrName={blog.mentor.userName} blogId={blog._id }/>
//               ))}
//         </div>

//       </main>
//     </div>
//   );
// }

// export default BlogList;







import React, { useEffect, useState } from 'react';
import { getBlogs } from '@/Api/services/menteeService';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BlogCard from '@/componets/BlogCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);

  const expectedPageSize = 2; // Adjust this number as needed

  const fetchBlogs = async (index) => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(async () => {
          const res = await getBlogs(`user/getAllblogs`, index);
          resolve(res);
        }, 2500); // Adjust the delay (in milliseconds) as needed
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
            <ReactLoading type="cylon" color="#000000" height={50} width={50} />
          </div>}
          endMessage={<p className="flex items-center justify-center h-full mt-5 font-inter ">Catch up all</p>}
        >
          <div className="space-y-8">
            {loading && index === 0
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="bg-white dark:bg-gray-100 dark:text-gray-900 rounded-xl overflow-hidden shadow-lg">
                    <div className="grid grid-cols-12 mx-auto rounded-lg">
                      <div className="col-span-full lg:col-span-4">
                        <Skeleton height={300} className="w-full h-full object-cover rounded-lg lg:rounded-l-lg lg:rounded-none" />
                      </div>
                      <div className="flex flex-col p-6 col-span-full lg:col-span-8 lg:p-10 bg-white rounded-lg lg:rounded-r-lg lg:rounded-l-none">
                        <div className="flex justify-start">
                          <Skeleton width={80} height={24} className="rounded-full" />
                        </div>
                        <Skeleton height={36} width={`80%`} className="mt-2" />
                        <Skeleton count={3} className="flex-1 pt-2" />
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex space-x-2">
                            <Skeleton circle={true} height={20} width={20} />
                            <Skeleton width={100} />
                          </div>
                          <Skeleton width={50} height={20} />
                        </div>
                      </div>
                    </div>
                  </div>
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
