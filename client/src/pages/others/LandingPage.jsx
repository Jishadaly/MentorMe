import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InfiniteMovingCardsDemo } from '@/componets/animations/InfiniteMovingCards';

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="text-gray-700 bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
      {/* Nav */}
      <nav>
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          <a className="font-extrabold text-2xl font-sans" href="#">
            MentorMe
          </a>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none">
              <svg xmlns="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ></svg>

            </button>
          </div>
          <div className="hidden lg:block">
            <ul className="inline-flex">
              <li>
                <a className="px-4 font-bold" href="/">Home</a>
              </li>
              <li>
                <a className="px-4 hover:text-gray-800" href="#">About</a>
              </li>
              <li>
                <a className="px-4 hover:text-gray-800" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Hero */}
      <div className="py-20" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container mx-auto px-6">
          <h2 className=" mb-2 text-white font-extrabold text-2xl font-sans">
            Welcome to MentorMe!
          </h2>
          <h3 className="text-2xl mb-8 text-gray-200">
            Find your programming mentor or mentee and level up your skills.
          </h3>
          <div className="flex justify-center">
            <button onClick={() => navigate('/mentor')} className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider mr-4">
              Mentor
            </button>
            <button onClick={() => navigate('/mentee/home')} className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
              Mentee
            </button>
          </div>
        </div>
      </div>
      {/* Features */}
      <section className="container mx-auto px-6 p-10">
        <h2 className="text-4xl font-sans font-extrabold text-center text-gray-800 mb-8">
          Key Features
        </h2>
        <div className="flex items-center flex-wrap mb-20">

          <InfiniteMovingCardsDemo />
        </div>
      </section>
      {/* Mentor Profiles */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-sans font-extrabold text-center text-gray-800 mb-8">
            Meet Our Mentors
          </h2>
          <div className="flex flex-wrap justify-center">
            {/* Mentor Profile Cards */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">John Doe</h3>
                <p className="text-gray-700">Senior Software Engineer</p>
                <p className="text-gray-700">10+ years of experience</p>
                <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-4 rounded-full">
                  View Profile
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">John Doe</h3>
                <p className="text-gray-700">Senior Software Engineer</p>
                <p className="text-gray-700">10+ years of experience</p>
                <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-4 rounded-full">
                  View Profile
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">John Doe</h3>
                <p className="text-gray-700">Senior Software Engineer</p>
                <p className="text-gray-700">10+ years of experience</p>
                <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-4 rounded-full">
                  View Profile
                </button>
              </div>
            </div>

            {/* Add more mentor profile cards here */}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-sans font-extrabold text-center text-gray-800 mb-8">
          Student Testimonials
        </h2>
        <div className="flex flex-wrap justify-center">
          {/* Testimonial Cards */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <p className="text-gray-700">
                "MentorMe helped me land my first job as a developer. The personalized mentorship was invaluable!"
              </p>
              <p className="text-gray-800 font-bold mt-4">- Emily Smith</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <p className="text-gray-700">
                "MentorMe helped me land my first job as a developer. The personalized mentorship was invaluable!"
              </p>
              <p className="text-gray-800 font-bold mt-4">- Emily Smith</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <p className="text-gray-700">
                "MentorMe helped me land my first job as a developer. The personalized mentorship was invaluable!"
              </p>
              <p className="text-gray-800 font-bold mt-4">- Emily Smith</p>
            </div>
          </div>
          {/* Add more testimonial cards here */}
        </div>
      </section>
      {/* Call to Action */}
      <section style={{ backgroundColor: '#667eea' }}>
        <div className="container mx-auto px-6 text-center py-20">
          <h2 className="mb-6 text-4xl font-sans font-extrabold text-center text-white mb-8e">
            Limited Spots Available!
          </h2>
          <h3 className="my-4 text-2xl text-white">
            Join MentorMe today and accelerate your programming journey!
          </h3>
          <button onClick={() => navigate('/signup')} className="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider">
            Sign Up Now
          </button>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-100">
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap">
            {/* Add content for footer */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;