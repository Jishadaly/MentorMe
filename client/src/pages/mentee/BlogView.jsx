import { fetchBlog } from '@/Api/services/menteeService';
import React, { useState ,useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BlogView() {
  const {blogId} = useParams();
  const [blog , setBlog] = useState('');
  console.log(blog,"///////");

  useEffect(() => {
    const getBlog = async () => {
      try {
        const blog = await fetchBlog('user/getBlog', blogId)
        setBlog(blog);
        
      } catch (error) {
        console.error(error); 
      }
    }
    getBlog()
  }, [blogId]);



  const renderBlock = (block) => {
    switch (block.type) {
      case 'header':
        return (
          <h3 key={block._id} className={`text-${block.data.level}xl font-bold font-inter`}>
            {block.data.text}
          </h3>
        );
      case 'paragraph':
        return (
          <p key={block._id} className="text-base text-gray-700 font-inter">
            {block.data.text}
          </p>
        );
      //   case 'list':
      // return (
      //   <ul key={block._id} className="list-disc ml-6 text-base text-gray-700 font-inter">
      //     {block.data.items.map((item, index) => (
      //       <li key={`${block._id}_${index}`}>
      //         {item}
      //       </li>
      //     ))}
      //   </ul>
      // );
      
      default:
        return null;
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="mx-auto mt-16 max-w-screen-xl">
        <article className="space-y-12 px-4 py-10 font-serif text-lg tracking-wide text-gray-700">
          <header className="text-center">
            <p className="text-gray-500">Published April 4, 2022</p>
            <h1 className="mt-2 text-2xl font-extrabold font-inter text-gray-900 sm:text-5xl">
              {blog.title}
            </h1>
            <p className="mt-6 text-md text-gray-700 font-inter ">{blog.summary}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Tags">
              <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Devoloping</button>
              <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Ai</button>
              <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Digital</button>
              <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Identity</button>
            </div>
            <img className="sm:h-[34rem] mt-10 w-full object-contain" src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Featured Image" />
          </header>

          <div className="mx-auto mt-10 max-w-screen-md space-y-12">
            {blog.content.blocks.map((block) => renderBlock(block))}
          </div>
        </article>
      </main>
    </div>
  );
}

export default BlogView;