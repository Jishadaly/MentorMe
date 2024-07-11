import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import HeaderTool from '@editorjs/header';
import List from '@editorjs/list';
import { addPost } from '@/Api/services/menteeService';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function CreateBlogs() {
  const editorInstance = useRef(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  

  useEffect(() => {
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
    });

    editorInstance.current = editor;

    return () => {
      editorInstance.current.destroy();
      editorInstance.current = null;
    };
  }, []);

  const handleSave = async () => {
    if (editorInstance.current) {
      
        const outputData = await editorInstance.current.save();
        const blogData = {
          title,
          summary,
          image,
          content: outputData,
          mentorId:user.id
        }

        console.log('Saved data: ', blogData);
        // Here you can send `blogData` to your backend for saving.
        // const addedpost = addPost('user/addBlog',blogData);       

        const addedpost = new Promise ((resolve , reject)=> {
          setTimeout(() => {
            addPost('user/addBlog',blogData).then((data)=>{
              resolve({message: "Your Blog is Published "})
          })
          }, 1500);
        })

       await toast.promise(addedpost , {
          loading : 'Blog publishing..',
          success:(data)=> data.message,
          error: 'errr',
        })

        navigate('/mentor/blogs')
         
    }
    
  };

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
              <h1 className='font-extrabold text-3xl font-inter'>Create blog</h1>
              <div className="mb-4 mt-10">
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
                    { image ? (
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
                onClick={handleSave}
                className="bg-indigo-500 text-white py-2 px-4 rounded" >
                 Publish Blog
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CreateBlogs;