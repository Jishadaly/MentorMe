import React from 'react'

export default function BlogCard({ index, image, date, title, summary, handleBlogClick, createrName, blogId, createrProfileImage }) {
  return (
    <div key={index} className="bg-white dark:bg-gray-100 dark:text-gray-900 rounded-xl overflow-hidden shadow-lg">
      <div className="grid grid-cols-12 mx-auto rounded-lg">
        <div className="col-span-full lg:col-span-4 h-46">
          <img src={image} alt={`Blog post ${index + 1}`} className="w-auto h-full object-cover rounded-lg lg:rounded-l-lg lg:rounded-none" />
        </div>
        <div className="flex flex-col p-6 col-span-full lg:col-span-8 lg:p-10 bg-white rounded-lg lg:rounded-r-lg lg:rounded-l-none">
          <div className="flex justify-start">
            <span className="px-2 py-1 text-xs rounded-full bg-violet-600 text-gray-50">{new Date(date).toLocaleDateString()}</span>
          </div>
          <h1 className="text-3xl font-semibold mt-2 font-inter text-gray-900">{title}</h1>
          <p className="flex-1 pt-2 font-inter text-gray-700">{summary}</p>
          <a rel="noopener noreferrer" href="#" className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm text-violet-600">
            <span className='font-inter' onClick={() => handleBlogClick(blogId)}>Read more</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
          <div className="flex items-center justify-between pt-2">
            <div className="flex space-x-2">
              <img
                src={createrProfileImage} // Replace with the actual path to your image
                alt="Profile Icon"
                className="w-8 h-8 rounded-full"
              />

              <span className="self-center text-sm font-inter">by {createrName}</span>
            </div>
            <span className="text-xs font-inter">3 min read</span>
          </div>
        </div>
      </div>
    </div>
  )
}
