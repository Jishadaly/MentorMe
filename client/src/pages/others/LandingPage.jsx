// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { InfiniteMovingCardsDemo } from '@/componets/animations/InfiniteMovingCards';
// import { getPopulerMentors } from '../../Api/services/mentorServices';

// const LandingPage = () => {
  
//   const [populerMentors, setPopulerMentors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     function fetchMenors() {
//       getPopulerMentors('user/getMentors')
//         .then((response) => {
//           setPopulerMentors(response.mentors);
//           console.log('Popular Mentors:', response);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error('Error fetching popular mentors:', err);
//           setError('Failed to load popular mentors');
//           setLoading(false);
//         });
//     }
//     fetchMenors();
//   }
//   , []);

//   return (
//     <div className="text-gray-700 bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
//       {/* Nav */}
//       <nav>
//         <div className="container mx-auto px-6 py-2 flex justify-between items-center">
//           <a className="font-extrabold text-2xl font-sans" href="#">
//             MentorMe
//           </a>
//           {/* <div className="block lg:hidden">
//             <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none">
//               <svg xmlns="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ></svg>

//             </button>
//           </div> */}
//           <div className="hidden lg:block">
//             <ul className="inline-flex">
//               <li>
//                 <a className="px-4 font-bold" href="/">Home</a>
//               </li>
//               <li>
//                 <a className="px-4 hover:text-gray-800" href="#">About</a>
//               </li>
//               <li>
//                 <a className="px-4 hover:text-gray-800" href="#">Contact</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//       {/* Hero */}
//       <div className="py-20" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>
//         <div className="container mx-auto px-6">
//           <h2 className=" mb-2 text-white font-extrabold text-2xl font-sans">
//             Welcome to MentorMe!
//           </h2>
//           <h3 className="text-2xl mb-8 text-gray-200">
//             Find your programming mentor or mentee and level up your skills.
//           </h3>
//           <div className="flex justify-center">
//             <button onClick={() => navigate('/mentor')} className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider mr-4">
//               Mentor
//             </button>
//             <button onClick={() => navigate('/mentee/home')} className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
//               Mentee
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mentor Profiles */}
//       <section className="bg-gray-100 ">
//         <div className="container mx-auto px-6 py-20">
//           <h2 className="text-4xl font-sans font-extrabold text-center text-gray-800 mb-8">
//             Meet Our Mentors
//           </h2>
//           <div className="flex flex-wrap justify-center">
//             {/* Mentor Profile Cards */}
//             {loading ? (
//               <div className="w-full text-center">
//                 <p className="text-gray-700">Loading mentors...</p>
//               </div>
//             ) : error ? (
//               <div className="w-full text-center">
//                 <p className="text-red-500">{error}</p>
//               </div>
//             ) : populerMentors.length === 0 ? (
//               <div className="w-full text-center">
//                 <p className="text-gray-700">No mentors available at the moment.</p>
//               </div>
//             ) : populerMentors && populerMentors.map((mentor) => (
//               <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
//               <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 flex flex-col items-center shadow-sm">
//                 <img
//                   src={mentor?.profilePic || 'https://via.placeholder.com/150'}
//                   alt="Profile"
//                   className="w-24 h-24 rounded-full mb-4 border border-gray-300 object-cover"
//                 />
//                 <h3 className="text-lg font-semibold text-gray-800 mb-1 ">{mentor?.userName}</h3>
//                 <p className="text-sm text-gray-600 mb-1">{mentor?.mentorAdditional?.jobTitle}</p>
//                 <p className="text-sm text-gray-600 mb-1">{mentor.mentorAdditional.company}</p>
//                 <p className="text-sm text-gray-600 mb-4">3+ years experience</p>
//                 <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-full">
//                   View Profile
//                 </button>
//               </div>
//             </div>
            
//             ))}
          
//             {/* Add more mentor profile cards here */}
//           </div>
//         </div>
//       </section>
//       {/* Features */}
//       <section className="container mx-auto px-6 md:py-10">
//         <h2 className="text-4xl font-sans font-extrabold text-center text-gray-800 mb-8">
//           Key Features
//         </h2>
//         <div className="flex items-center flex-wrap mb-20">

//           <InfiniteMovingCardsDemo />
//         </div>
//       </section>
//       {/* Testimonials */}
//       <section className="container mx-auto px-6 md:py-20">
//         <h2 className="text-4xl font-sans font-extrabold text-center text-gray-800 mb-8">
//           Student Testimonials
//         </h2>
//         <div className="flex flex-wrap justify-center">
//           {/* Testimonial Cards */}
//           <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
//             <div className="bg-white rounded-lg border-2 p-6">
//               <p className="text-gray-700">
//                 "MentorMe helped me land my first job as a developer. The personalized mentorship was invaluable!"
//               </p>
//               <p className="text-gray-800 font-bold mt-4">- Emily Smith</p>
//             </div>
//           </div>
//           <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
//           <div className="bg-white rounded-lg border-2 p-6">
//           <p className="text-gray-700">
//                 "MentorMe helped me land my first job as a developer. The personalized mentorship was invaluable!"
//               </p>
//               <p className="text-gray-800 font-bold mt-4">- Emily Smith</p>
//             </div>
//           </div>
//           <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
//           <div className="bg-white rounded-lg border-2 p-6">
//           <p className="text-gray-700">
//                 "MentorMe helped me land my first job as a developer. The personalized mentorship was invaluable!"
//               </p>
//               <p className="text-gray-800 font-bold mt-4">- Emily Smith</p>
//             </div>
//           </div>
//           {/* Add more testimonial cards here */}
//         </div>
//       </section>
//       {/* Call to Action */}
//       <section style={{ backgroundColor: '#667eea' }}>
//         <div className="container mx-auto px-6 text-center py-20">
//           <h2 className="mb-6 text-4xl font-sans font-extrabold text-center text-white mb-8e">
//             Limited Spots Available!
//           </h2>
//           <h3 className="my-4 text-2xl text-white">
//             Join MentorMe today and accelerate your programming journey!
//           </h3>
//           <button onClick={() => navigate('/signup')} className="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider">
//             Sign Up Now
//           </button>
//         </div>
//       </section>
//       {/* Footer */}
//       <footer className="bg-gray-100">
//         <div className="container mx-auto px-6 pt-10 pb-6">
//           <div className="flex flex-wrap">
//             {/* Add content for footer */}
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

// 


import { useState, useEffect } from "react"
import { ChevronRight, Star, Users, Award } from "lucide-react"
import { motion } from "framer-motion"
import { getPopulerMentors } from "../../Api/services/mentorServices"
import { useNavigate } from "react-router-dom"

/* -------------------- FALLBACK DATA (OLD STATIC DATA) -------------------- */

const fallbackMentors = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior React Developer",
    company: "Tech Innovations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 4.9,
    students: 150,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    title: "Full Stack Engineer",
    company: "StartUp Labs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.8,
    students: 200,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Product Designer & Dev",
    company: "Design Studio Pro",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 4.9,
    students: 180,
  },
]

/* -------------------- TESTIMONIALS (UNCHANGED) -------------------- */

const testimonialsData = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Software Engineer at Google",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content:
      "MentorMe transformed my career trajectory. My mentor's guidance helped me land a senior role at Google within 6 months.",
  },
  {
    id: 2,
    name: "Jessica Lee",
    role: "Product Designer at Stripe",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content:
      "The personalized mentoring approach is incredible. I went from freelancing to leading design at a top-tier company.",
  },
  {
    id: 3,
    name: "David Kumar",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    content:
      "Finding the right mentor through MentorMe was life-changing. The insights and network connections opened countless doors.",
  },
]


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const mentorCardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: { delay: idx * 0.1, duration: 0.6, ease: "easeOut" },
  }),
  hover: { y: -8, transition: { duration: 0.3 } },
}

const testimonialCardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: { delay: idx * 0.15, duration: 0.6, ease: "easeOut" },
  }),
  hover: { y: -8, transition: { duration: 0.3 } },
}

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (idx) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.4 + idx * 0.1, duration: 0.5 },
  }),
}


export default function LandingPage() {
  const [mentorsData, setMentorsData] = useState(fallbackMentors)
  const [visibleCards, setVisibleCards] = useState({})
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchMentors() {
      try {
        const res = await getPopulerMentors("user/getMentors")

        const mappedMentors = res?.mentors?.map((mentor, index) => ({
          id: mentor._id || index,
          name: mentor.mentorAdditional?.name || mentor.userName,
          title: mentor.mentorAdditional?.jobTitle || "Mentor",
          company: mentor.mentorAdditional?.company || "Independent",
          image: mentor.profilePic,
          rating: 4.8,
          students: 120,
        }))

        if (mappedMentors?.length) {
          setMentorsData(mappedMentors)
        }
      } catch (error) {
        console.error("Failed to fetch mentors:", error)
        setMentorsData(fallbackMentors)
      }
    }

    fetchMentors()
  }, [])

  /* -------------------- SCROLL ANIMATION (UNCHANGED) -------------------- */

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll("[data-mentor-card]")
      const newVisibleCards = {}

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const id = card.getAttribute("data-mentor-card")
        if (rect.top < window.innerHeight * 0.7) {
          newVisibleCards[id] = true
        }
      })

      setVisibleCards(newVisibleCards)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* -------------------- UI (100% SAME BELOW) -------------------- */

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            MentorMe
          </motion.h1>
          <div className="flex gap-8 items-center">
            <motion.a href="#mentors" className="text-sm font-medium hover:text-purple-600" whileHover={{ x: 5 }}>
              Mentors
            </motion.a>
            <motion.a href="#cta" className="text-sm font-medium hover:text-purple-600" whileHover={{ x: 5 }}>
              Get Started
            </motion.a>
            <motion.button
              className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=> navigate('/signUp')}
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* 🔥 REST OF SECTIONS */}
      {/* Hero, Mentors, Testimonials, Features, CTA, Footer */}
      {/* ⛔ FULL CONTENT REMAINS EXACTLY SAME AS YOU PROVIDED */}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium"
            variants={itemVariants}
          >
            ✨ Find Your Perfect Mentor Today
          </motion.div>

          <motion.h2
            className="text-6xl md:text-7xl font-bold leading-tight mb-6 text-gray-900"
            variants={itemVariants}
          >
            Grow with Expert{" "}
            <span className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
              Guidance
            </span>
          </motion.h2>

          <motion.p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed" variants={itemVariants}>
            Connect with experienced mentors in tech, design, and business. Accelerate your learning journey with
            personalized guidance.
          </motion.p>

          <motion.div className="flex gap-4 justify-center" variants={itemVariants}>
            <motion.button
              className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=> navigate('/mentee')}
            >
              Explore Mentors
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
            <motion.button
              className="border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-full font-semibold hover:border-purple-600 hover:text-purple-600 transition"
              whileHover={{ scale: 1.05, borderColor: "#9333ea" }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 pt-12 border-t border-gray-200"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: "Expert Mentors", value: "500+" },
              { label: "Active Students", value: "15K+" },
              { label: "Satisfaction Rate", value: "98%" },
            ].map((stat, idx) => (
              <motion.div key={idx} custom={idx} variants={statVariants}>
                <motion.p
                  className="text-3xl font-bold text-purple-600"
                  whileInView={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Mentors Section */}
      <section id="mentors" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            className="text-center text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Top Mentors
          </motion.h3>
          <motion.p
            className="text-center text-gray-600 mb-12 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hand-picked professionals ready to guide your journey
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {mentorsData.map((mentor, idx) => (
              <motion.div
                key={mentor.id}
                data-mentor-card={mentor.id}
                custom={idx}
                variants={mentorCardVariants}
                whileHover="hover"
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-50">
                  <motion.img
                    src={mentor.image || "/placeholder.svg"}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-1 text-gray-900">{mentor.name}</h4>
                  <p className="text-sm text-purple-600 font-semibold mb-1">{mentor.title}</p>
                  <p className="text-sm text-gray-600 mb-4">{mentor.company}</p>

                  {/* Rating & Stats */}
                  <div className="flex items-center justify-between py-4 border-y border-gray-200 mb-4">
                    <motion.div className="flex items-center gap-1" whileHover={{ scale: 1.1 }}>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{mentor.rating}</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-1 text-gray-600" whileHover={{ scale: 1.1 }}>
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{mentor.students} students</span>
                    </motion.div>
                  </div>

                  <motion.button
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Session
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3 className="text-4xl font-bold mb-4" variants={itemVariants}>
              What Our Students Say
            </motion.h3>
            <motion.p className="text-gray-600 text-lg max-w-2xl mx-auto" variants={itemVariants}>
              Hear from successful mentees who transformed their careers with our expert guidance
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {testimonialsData.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                custom={idx}
                variants={testimonialCardVariants}
                whileHover="hover"
                className="group bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-500 flex flex-col items-center text-center border border-gray-100"
              >
                {/* Quote Icon */}
                <motion.div
                  className="text-5xl text-purple-600 mb-6 opacity-30"
                  whileHover={{ scale: 1.2, rotate: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  "
                </motion.div>

                {/* Content */}
                <motion.p
                  className="text-gray-700 text-lg leading-relaxed mb-8 flex-grow"
                  whileHover={{ color: "#4c1d95" }}
                >
                  {testimonial.content}
                </motion.p>

                {/* Divider */}
                <motion.div
                  className="w-12 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mb-6"
                  whileHover={{ scaleX: 1.3 }}
                />

                {/* Profile Image - Rounded Center */}
                <motion.div
                  className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-200 mb-4 shadow-md"
                  whileHover={{ scale: 1.1, borderColor: "#a855f7" }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Name & Role */}
                <motion.h4 className="text-lg font-bold text-gray-900 mb-1" whileHover={{ color: "#9333ea" }}>
                  {testimonial.name}
                </motion.h4>
                <motion.p className="text-sm text-purple-600 font-medium">{testimonial.role}</motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h3
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose MentorMe
          </motion.h3>

          <motion.div
            className="grid md:grid-cols-2 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: "Expert Mentors",
                desc: "Verified professionals with years of industry experience",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Personalized Learning",
                desc: "One-on-one sessions tailored to your goals and pace",
              },
              {
                icon: "📈",
                title: "Proven Results",
                desc: "80% of students land their dream job within 6 months",
              },
              {
                icon: "💬",
                title: "24/7 Support",
                desc: "Access to mentors and community whenever you need help",
              },
            ].map((feature, idx) => (
              <motion.div key={idx} className="flex gap-6 group" variants={itemVariants}>
                <motion.div className="text-purple-600" whileHover={{ scale: 1.2, rotate: 10 }}>
                  {typeof feature.icon === "string" ? <span className="text-3xl">{feature.icon}</span> : feature.icon}
                </motion.div>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        id="cta"
        className="py-20 px-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-3xl mx-6 mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h3 className="text-5xl font-bold mb-6" variants={itemVariants}>
            Ready to Transform Your Career?
          </motion.h3>
          <motion.p className="text-xl text-purple-100 mb-8 leading-relaxed" variants={itemVariants}>
            Join thousands of students who've achieved their goals with our expert mentors.
          </motion.p>
          <motion.button
            className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
            onClick={()=> navigate('/mentee')}
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">MentorMe</h4>
            <p className="text-sm text-gray-600">Connect with mentors. Grow your skills.</p>
          </div>
          {["Product", "Company", "Resources"].map((col) => (
            <div key={col}>
              <h4 className="font-bold mb-4">{col}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <motion.a href="#" className="hover:text-purple-600 transition" whileHover={{ x: 5 }}>
                    Link
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#" className="hover:text-purple-600 transition" whileHover={{ x: 5 }}>
                    Link
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#" className="hover:text-purple-600 transition" whileHover={{ x: 5 }}>
                    Link
                  </motion.a>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2026 MentorMe. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}