import { getBlogs } from '@/Api/services/menteeService';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function BlogList() {

  const [ blogs , setBlogs ] = useState([]);
  const navigate  = useNavigate();

  useEffect(()=>{
    const getAllBlogs = async()=>{
      const datas = await getBlogs('user/getAllblogs'); 
      // console.log(datas);

      setBlogs(datas)
    }

    getAllBlogs();
    

  },[]);

  const viewBlog = (blogId) =>{
    console.log(blogId);
    navigate(`/mentee/blogView/${blogId}`);

  }
  

  const images = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4'
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 font-inter text-gray-900">Design Tools</h1>
        <p className="text-center text-gray-600 mb-12 font-inter">A description of the respective category goes right here. Be as expressive as possible, but in brief.</p>
        <div className="space-y-8">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white dark:bg-gray-100 dark:text-gray-900 rounded-xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-12 mx-auto rounded-lg">
                <div className="col-span-full lg:col-span-4">
                  <img src={images[0]} alt={`Blog post ${index + 1}`} className="w-full h-full object-cover rounded-lg lg:rounded-l-lg lg:rounded-none" />
                </div>
                <div className="flex flex-col p-6 col-span-full lg:col-span-8 lg:p-10 bg-white rounded-lg lg:rounded-r-lg lg:rounded-l-none">
                  <div className="flex justify-start">
                    <span className="px-2 py-1 text-xs rounded-full bg-violet-600 text-gray-50">August 13, 2021</span>
                  </div>
                  <h1 className="text-3xl font-semibold mt-2 font-inter text-gray-900">{blog.title}</h1>
                  <p className="flex-1 pt-2 font-inter text-gray-700">{blog.summary}</p>
                  <a rel="noopener noreferrer" href="#" className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm text-violet-600">
                    <span className='font-inter' onClick={()=> viewBlog(blog._id)} >Read more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-600">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                      </svg>
                      <span className="self-center text-sm font-inter">by {blog.mentor.userName}</span>
                    </div>
                    <span className="text-xs font-inter">3 min read</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button className="px-4 py-2 text-white bg-gray-900 rounded">More articles</button>
        </div>
      </main>
    </div>
  );
}

export default BlogList;
