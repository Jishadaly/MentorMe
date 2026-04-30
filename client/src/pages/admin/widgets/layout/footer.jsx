// import PropTypes from "prop-types";
// import { Typography } from "@material-tailwind/react";
// import { HeartIcon } from "@heroicons/react/24/solid";

// export function Footer({ brandName, brandLink, routes }) {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="py-2">
//       <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
//         <Typography variant="small" className="font-normal text-inherit">
//           &copy; {year}, made with{" "}
//           <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" /> by{" "}
//           <a
//             href={brandLink}
//             target="_blank"
//             className="transition-colors hover:text-blue-500 font-bold"
//           >
//             {brandName}
//           </a>{" "}
//           for a better web.
//         </Typography>
//         <ul className="flex items-center gap-4">
//           {routes.map(({ name, path }) => (
//             <li key={name}>
//               <Typography
//                 as="a"
//                 href={path}
//                 target="_blank"
//                 variant="small"
//                 className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
//               >
//                 {name}
//               </Typography>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </footer>
//   );
// }

// Footer.defaultProps = {
//   brandName: "Creative Tim",
//   brandLink: "https://www.creative-tim.com",
//   routes: [
//     { name: "Creative Tim", path: "https://www.creative-tim.com" },
//     { name: "About Us", path: "https://www.creative-tim.com/presentation" },
//     { name: "Blog", path: "https://www.creative-tim.com/blog" },
//     { name: "License", path: "https://www.creative-tim.com/license" },
//   ],
// };

// Footer.propTypes = {
//   brandName: PropTypes.string,
//   brandLink: PropTypes.string,
//   routes: PropTypes.arrayOf(PropTypes.object),
// };

// Footer.displayName = "/src/widgets/layout/footer.jsx";

// export default Footer;



// ============================================
// 4. Footer.jsx - New Component for Layout
// ============================================
import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">mentor me.</h3>
            <p className="text-sm text-gray-400">
              Connect with experienced mentors and accelerate your career growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Find Mentors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become a Mentor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-colors">
                <FiGithub size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-colors">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-colors">
                <FiMail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 Mentor Me. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}