import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import HeaderTool from '@editorjs/header';
import List from '@editorjs/list';
// import { updatePost } from '@/Api/services/menteeService'; // Assuming you have an updatePost service
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { deleteBlog, fetchBlog ,updatePost } from '@/Api/services/menteeService';

const EditBlog = () => {
  const { blogId } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState(null);
  const [summary, setSummary] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await fetchBlog(`user/getBlog`,blogId);
        // const data = await response.json();
        console.log(response);
        const data = response

        setBlog(data);
        setTitle(data.title);
        setSummary(data.summary);
        setImage(data.image);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
  
    getBlog();
  }, [blogId]);
  
  
  const editorInstance = useRef(null);



  

  useEffect(() => {
    if (blog) {
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: {
            class: HeaderTool,
            shortcut: 'CMD+SHIFT+H',
            config: {
              placeholder: 'Enter a header',
              levels: [2, 3, 4],
              defaultLevel: 3,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
        },
        data: blog.content,
      });
  
      editorInstance.current = editor;
  
      return () => {
        editorInstance.current.destroy();
        editorInstance.current = null;
      };
    }
  }, [blog]);
  

  const handleSave = async () => {
    console.log(handleSave);
    if (editorInstance.current) {
      const outputData = await editorInstance.current.save();
      const blogData = {
        title,
        summary,
        image,
        content: outputData,
        blogId,
      };

      
          
         try {
          const updatePromise =  await updatePost(`user/updateBlog`, blogData)
          // toast.promise(updatePromise, {
          //   loading: 'Blog updating...',
          //   success: (data) => 'Your Blog is updated',
          //   error: 'Error updating blog',
          // });
          setBlog(updatePromise.data);
          console.log(updatePromise);
          toast.success('blog Updated')
         } catch (error) {
          console.log(error);
          toast.error(error)
         }
    }
  };

  const handleDelete =async (blogId)=>{
    console.log(blogId);
    try {
      const d = await deleteBlog('user/deleteBlog',blogId);
      toast.info('Blog deleted')
      navigate('/mentor/blogs')
    } catch (error) {
      
    }
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
    <main className="ml-64 mt-16 p-6 flex-1 overflow-y-auto">
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col min-h-screen bg-gray-100 p-6">
          <div className="max-w-3xl bg-white p-8 rounded-lg shadow-md">
            {blog ? (
              <>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-inter">Title</label>
                  <input
                    type="text"
                    placeholder="Add an engaging title here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Blog Summary (~ 200 characters)</label>
                  <textarea
                    placeholder="Briefly describe what the blog aims to cover."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Featured Image</label>
                  <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      {image ? (
                        <img src={image} alt="Blog Thumbnail" className="max-w-full h-auto mx-auto" />
                      ) : (
                        <div>
                          <p>Click to Add Your Blog Thumbnail or drag and drop</p>
                          <p className="text-gray-500">PNG, JPG (max. 800x400px)</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Start Writing Here</label>
                  <div id="editorjs" className="border border-gray-300 rounded p-4"></div>
                </div>
                <button
                  onClick={ handleSave }
                  className="bg-indigo-500 text-white py-2 px-4 rounded mb-4 mr-2"
                >
                  Publish Blog
                </button>
                <button
                  onClick={()=>handleDelete(blog._id)}
                  className="bg-red-800 text-white py-2 px-4 rounded mb-4"
                >
                  Delete Blog
                </button>
              </>
            ) : (
              <p>Loading blog data...</p>
            )}
          </div>
        </div>
      </section>
    </main>
  </div>
  );
};

export default EditBlog;
