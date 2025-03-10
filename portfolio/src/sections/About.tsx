'use client';

import { forwardRef, useState, useEffect } from "react";
import { useCircleEffects } from "../components/effects";
import "../styles/effects.css";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const arrowSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 animate-bounce"
    fill="none"
    viewBox="0 0 24 24"
    stroke="white"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const About = forwardRef<HTMLDivElement>((props, ref) => {
  About.displayName = "About";
  const { circles } = useCircleEffects();

  const skillsList = [
    "Deep Learning",
    "Computer Vision",
    "Docker",
    "Kubernetes",
    "IoT",
    "NLP",
    "Edge AI",
    "Web Dev",
    "Data Science",
  ];

  const [skills] = useState(skillsList.map((skill, index) => ({ id: index, name: skill })));

  const [isAwardHovered, setIsAwardHovered] = useState(false);
  const [isSkillsHovered, setIsSkillsHovered] = useState(false);

  useEffect(() => {
    document.body.classList.add("is-mounted");
  }, []);

  return (
    <div
      id="about"
      ref={ref}
      className="h-screen bg-gray-900 text-white flex flex-col lg:flex-row px-6 py-20 relative"
    >
      {/* Left Column - About Section */}
      <div className="lg:w-2/3 w-full relative z-10 pr-20 md:pr-32 lg:pr-0 text-center mx-auto">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className={`absolute rounded-full ${circle.hover ? "hover" : ""}`}
            style={{
              left: `${circle.x}px`,
              top: `${circle.y}px`,
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              backgroundColor: circle.hover
                ? "rgba(255, 255, 255, 0.8)"
                : circle.color,
              opacity: circle.opacity,
              transform: "translate(-50%, -50%)",
              boxShadow: circle.hover ? "0px 0px 10px 5px rgba(255, 255, 255, 0.7)" : "none",
            }}
          />
        ))}

        <div className="font-serif max-w-3xl mx-auto relative z-10">
          <h2 className="text-5xl font-extrabold text-shadow-lg mb-6">About Me</h2>
          <p className="font-sans text-lg md:text-xl text-white/90 leading-relaxed mb-8">
            I am 
            <span className="text-yellow-400">Piyush Kaushik Bhattacharyya</span>, a B.Tech
            undergraduate at KIIT, specializing in{" "}
            <span className="text-yellow-400">Artificial Intelligence</span> and{" "}
            <span className="text-yellow-400">Machine Learning</span>. Passionate about deep
            learning, computer vision, and IoT, I enjoy building intelligent solutions that bridge
            the gap between data and real-world applications.
          </p>
        </div>
        {/* Link to Projects Page */}
        {/* Link to About Page */}  
        <div className="flex justify-center mt-6">  
          <Link href="#project">  
            <button className="font-serif bg-yellow-400 text-black py-3 px-8 text-xl font-semibold rounded-lg hover:bg-yellow-500 transition-all z-2">  
              View my Projects!  
            </button>  
          </Link>  
        </div>
      </div>

      {/* Right Column - Fixed Popups */}
      <div className="absolute right-0 top-1/3 z-50 flex flex-col gap-10">
        {/* Awards Section */}
        <div
          className="text-white text-lg font-semibold cursor-pointer group transform rotate-90"
          onMouseEnter={() => setIsAwardHovered(true)}
          onMouseLeave={() => setIsAwardHovered(false)}
        >
          <div className="font-sans bg-gray-800/50 backdrop-blur-lg p-3 rounded-md">Awards</div>
          {isAwardHovered && (
            <motion.div
              className="absolute right-[-100%] transform translate-x-0 p-6 bg-gray-900/0 rounded-lg w-72 shadow-xl backdrop-blur-md border border-gray-700"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="transform -rotate-90">
                <h3 className="font-sans text-lg font-semibold text-white">Awards</h3>
                <p className="font-sans text-white mt-2">🏆 Best Paper for NICEDT-2025 Track 6</p>
                <Image
                  src="/assets/images/certificate.jpg"
                  alt="NICEDT-2025 Certificate"
                  className="w-full mt-2 rounded-md"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Skills Section */}
        <div
          className="text-white text-lg font-semibold cursor-pointer group transform rotate-90"
          onMouseEnter={() => setIsSkillsHovered(true)}
          onMouseLeave={() => setIsSkillsHovered(false)}
        >
          <div className="font-sans bg-gray-800/50 backdrop-blur-lg p-3 rounded-md ">Skills</div>
          {isSkillsHovered && (
            <motion.div
              className="transform rotate-90 absolute right-[-100%] transform translate-x-0 p-6 bg-gray-900/0 rounded-lg w-72 shadow-xl backdrop-blur-md border border-gray-700"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="transform -rotate-90">
                <h3 className="font-sans text-lg font-semibold text-white">Skills</h3>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-2 bg-white/30 rounded-md text-gray-900 text-sm font-semibold text-center"
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
});
About.displayName = "About";
export default About;