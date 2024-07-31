import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import HeaderTool from '@editorjs/header';
import List from '@editorjs/list';
import { addPost } from '@/Api/services/menteeService';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { validationSchema } from '@/utils/validations/blogValidation';

function CreateBlogs() {
  const editorInstance = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

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

  const formik = useFormik({
    initialValues: {
      title: '',
      summary: '',
      image: null,
      imagePreview: null, // for displaying the preview of the image
    },
    validationSchema,
    onSubmit: async (values) => {
      if (editorInstance.current) {
         const outputData = await editorInstance.current.save();
        
        if (outputData.blocks.length === 0) {
          toast.error('Content is required');
          return;
        }

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('summary', values.summary);
        formData.append('content', JSON.stringify(outputData)); // Stringify the content
        formData.append('mentorId', user.id);

        if (values.image){
          formData.append('image', values.image);
        }

        const addedPost = new Promise((resolve, reject) => {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }

          setTimeout(() => {
            addPost('user/addBlog', formData ,config) 
            .then((data) => {
              resolve({ message: "Your Blog is Published" });
            }).catch((error) => {
              reject(error);
            });
          }, 1500);
        });

        await toast.promise(addedPost, {
          loading: 'Blog publishing..',
          success: (data) =>{
            navigate('/mentor/blogs');
           return data.message
          },
          error: 'Error publishing blog',
        });
      }
    },
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      formik.setFieldValue('image', file);
      formik.setFieldValue('imagePreview', URL.createObjectURL(file)); // setting the image preview
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="ml-64 mt-16 p-6 flex-1 overflow-y-auto">
        <section className="max-w-7xl mx-auto">
          <div className="flex flex-col min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl bg-white p-8 rounded-lg shadow-md">
              <h1 className='font-extrabold text-3xl font-inter'>Create blog</h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4 mt-10">
                  <label className="block text-gray-700 mb-2 font-inter">Title</label>
                  <input
                    type="text"
                    placeholder="Add an engaging title here..."
                    {...formik.getFieldProps('title')}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-500">{formik.errors.title}</div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Blog Summary (~ 200 words)</label>
                  <textarea
                    placeholder="Briefly describe what the blog aims to cover."
                    {...formik.getFieldProps('summary')}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                  {formik.touched.summary && formik.errors.summary ? (
                    <div className="text-red-500">{formik.errors.summary}</div>
                  ) : null}
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
                      {formik.values.imagePreview ? (
                        <img src={formik.values.imagePreview} alt="Blog Thumbnail" className="max-w-full h-auto mx-auto" />
                      ) : (
                        <div>
                          <p>Click to Add Your Blog Thumbnail or drag and drop</p>
                          <p className="text-gray-500">PNG, JPG (max. 800x400px)</p>
                        </div>
                      )}
                    </label>
                  </div>
                  {formik.touched.image && formik.errors.image ? (
                    <div className="text-red-500">{formik.errors.image}</div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Start Writing Here</label>
                  <div id="editorjs" className="border border-gray-300 rounded p-4"></div>
                </div>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white py-2 px-4 rounded"
                >
                  Publish Blog
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CreateBlogs;
