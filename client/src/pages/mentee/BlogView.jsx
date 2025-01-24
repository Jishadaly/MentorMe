import { fetchBlog } from '@/Api/services/menteeService';
import moment from 'moment';
import React, { useState ,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FlagIcon , HandClappingIcon , CommentIcon } from '@/componets/icons/chatIcons';
import ReportModal from '@/componets/modal/ReportModal';

function BlogView() {
  const {blogId} = useParams();
  const [blog , setBlog] = useState('');
  const [isReportModalOpen, setReportModalOpen] = useState(false);
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
          <h3 key={block._id} className={`text-${block.data.level}xl font-extrabold font-inter text-black`}>
            {block.data.text}
          </h3>
        );
      case 'paragraph':
        return (
          <p key={block._id} className="text-base text-gray-700 font-inter">
            {block.data.text}
          </p>
        );
      default:
        return null;
    }
  };

  const handleReport = (reason, customMessage) => {
    console.log('Report reason:', reason);
    console.log('Custom message:', customMessage);
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  const formattedDate = moment(blog.createdAt).format('MMMM D YYYY');


  return (
    <div className="relative flex min-h-screen bg-gray-100">
      <button
      onClick={() => setReportModalOpen(true)}
      
      className="absolute top-20 right-4 px-4 py-2 bg-gray-100 text-red-500 font-semibold rounded-md font-inter cursor-pointer flex items-center space-x-2"
    >
      
      <FlagIcon width="24" height="24" />
    </button>
      <main className=" mx-auto mt-16 max-w-screen-xl">
      
        <article className="space-y-12 px-4 py-10 font-serif text-lg tracking-wide text-gray-700">
          <header className="text-center">
            
            <p className="text-gray-500 font-inter text-sm">Published {formattedDate} </p> 
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
            <img className="sm:h-[34rem] mt-10 w-full object-contain" src={blog.image} alt="Featured Image" />
          </header>


          <div className="mx-auto mt-10 max-w-screen-md space-y-12">
            {blog.content.blocks.map((block) => renderBlock(block))}
          </div>
        </article>
      </main>
      <ReportModal isOpen={isReportModalOpen} onClose={() => setReportModalOpen(false)} onSubmit={handleReport} blogId = {blog._id} />
    </div>
  );
}

export default BlogView;