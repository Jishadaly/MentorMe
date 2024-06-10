import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-start justify-center h-screen bg-gray-100 pt-2 pl-10">
      <h1 className="text-6xl font-sans font-extrabold text-gray-800 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-4 font-sans">Page Not Found</p>
      <p className="text-lg text-gray-700 mb-4 font-sans font-extralight">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="text-sm text-gray-500">
        You might want to check the URL or go back to the{' '}
        <a href="/" className="text-blue-500 underline">
          homepage
        </a>
        .
      </p>
    </div>
  );
};

export default PageNotFound;
