// "use client";
// import { cn } from "@/utils/cn";
// import React, { useEffect, useState } from "react";

// export const InfiniteMovingCards = ({
//   items,
//   direction = "left",
//   speed = "fast",
//   pauseOnHover = true,
//   className,
// }) => {
//   const containerRef = React.useRef(null);
//   const scrollerRef = React.useRef(null);

//   useEffect(() => {
//     addAnimation();
//   }, []);

//   const [start, setStart] = useState(false);

//   function addAnimation() {
//     if (containerRef.current && scrollerRef.current) {
//       const scrollerContent = Array.from(scrollerRef.current.children);

//       scrollerContent.forEach((item) => {
//         const duplicatedItem = item.cloneNode(true);
//         if (scrollerRef.current) {
//           scrollerRef.current.appendChild(duplicatedItem);
//         }
//       });

//       getDirection();
//       getSpeed();
//       setStart(true);
//     }
//   }

//   const getDirection = () => {
//     if (containerRef.current) {
//       if (direction === "left") {
//         containerRef.current.style.setProperty("--animation-direction", "forwards");
//       } else {
//         containerRef.current.style.setProperty("--animation-direction", "reverse");
//       }
//     }
//   };

//   const getSpeed = () => {
//     if (containerRef.current) {
//       if (speed === "fast") {
//         containerRef.current.style.setProperty("--animation-duration", "20s");
//       } else if (speed === "normal") {
//         containerRef.current.style.setProperty("--animation-duration", "40s");
//       } else {
//         containerRef.current.style.setProperty("--animation-duration", "80s");
//       }
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={cn(
//         "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
//         className
//       )}
//     >
//       <ul
//         ref={scrollerRef}
//         className={cn(
//           "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
//           start && "animate-scroll",
//           pauseOnHover && "hover:[animation-play-state:paused]"
//         )}
//       >
//         {items.map((item) => (
//           <li
//             className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
//             style={{
//               background: "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
//             }}
//             key={item.name}
//           >
//             <blockquote>
//               <div
//                 aria-hidden="true"
//                 className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
//               ></div>
//               <span className="relative z-20 text-sm leading-[1.6] text-black-200 font-normal">
//                 {item.quote}
//               </span>
//               <div className="relative z-20 mt-6 flex flex-row items-center">
//                 <span className="flex flex-col gap-1">
//                   <span className="text-sm leading-[1.6] text-gray-400 font-normal">
//                     {item.name}
//                   </span>
//                   <span className="text-sm leading-[1.6] text-gray-400 font-normal">
//                     {item.title}
//                   </span>
//                 </span>
//               </div>
//             </blockquote>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const duration = useMemo(() => {
    if (speed === "fast") return 20;
    if (speed === "normal") return 40;
    return 80;
  }, [speed]);

  const xFrom = direction === "left" ? "0%" : "-50%";
  const xTo = direction === "left" ? "-50%" : "0%";

  return (
    <div
      className={cn(
        "relative overflow-hidden max-w-7xl mx-auto",
        "[mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className
      )}
    >
      <motion.div
        className="flex gap-6 w-max py-6"
        animate={{
          x: isHovered && pauseOnHover ? xFrom : [xFrom, xTo],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
        onHoverStart={() => pauseOnHover && setIsHovered(true)}
        onHoverEnd={() => pauseOnHover && setIsHovered(false)}
      >
        {[...items, ...items].map((item, idx) => (
          <motion.div
            key={`${item.name}-${idx}`}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative w-[360px] md:w-[420px] flex-shrink-0 rounded-3xl border border-white/10
                       bg-gradient-to-br from-white/10 to-white/5
                       backdrop-blur-xl shadow-xl p-6"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-indigo-500/10 blur-2xl opacity-0 hover:opacity-100 transition-opacity" />

            {/* Content */}
            <blockquote className="relative z-10">
              <p className="text-sm leading-relaxed text-gray-200">
                “{item.quote}”
              </p>

              <div className="mt-6 flex items-center gap-3">
                {/* Avatar (future-ready) */}
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {item.name?.charAt(0)}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {item.title}
                  </span>
                </div>
              </div>
            </blockquote>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
