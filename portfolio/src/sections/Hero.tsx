'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCircleEffects } from "../components/effects";
import "../styles/effects.css";
import Link from "next/link";

export const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { circles, mousePos } = useCircleEffects();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div id="hero" className="relative py-19 md:py-20 sm:mt-20 overflow-hidden h-screen snap-start">
      
      {/* Floating circles effect */}
      {circles.map((circle) => (
        <div
          key={circle.id}
          className={`circle ${circle.hover ? "hover" : ""}`}
          style={{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            backgroundColor: circle.hover ? "rgba(255, 255, 255, 0.8)" : circle.color,
            opacity: circle.opacity,
            transform: `translate(-50%, -50%)`,
            boxShadow: circle.hover ? "0px 0px 10px 5px rgba(255, 255, 255, 0.7)" : "none",
          }}
        />
      ))}

      {/* GitHub & LinkedIn Buttons */}
      <div className="absolute top-10 right-10 flex flex-col space-y-3">
        {/* GitHub Button */}
        <a
          href="https://github.com/PiyushKBhattacharyya"
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          className="relative z-50 flex items-center gap-2 bg-[#24292e]  px-4 py-2 rounded-lg backdrop-blur-md cursor-pointer hover:bg-[#2f363d] transition"
        >
          <Image src="/assets/images/github.png" alt="GitHub" width={24} height={24} />
        </a>

        {/* LinkedIn Button */}
        <a
          href="https://www.linkedin.com/in/piyush-bhattacharyya-0b8a03131"
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          className="relative z-50 flex items-center gap-2 bg-[#0077b5] px-4 py-2 rounded-lg backdrop-blur-md cursor-pointer hover:bg-[#005582] transition"
        >
          <Image src="/assets/images/linkedin.png" alt="LinkedIn" width={24} height={24} />
        </a>
      </div>

      {/* Hero Content */}
      <div className="container flex flex-col justify-center items-center relative z-10">
        <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-transparent shadow-lg">
          <Image
            src="/assets/images/profile.png"
            alt="Person peeking from behind laptop"
            width={224}
            height={224}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="bg-gray-950 border items-center border-gray-800 px-4 py-1.5 inline-flex text-white gap-4 rounded-lg">
          <div className="bg-green-500 size-2.5 rounded-full"></div>
          <div className="text-medium font-medium">
            Piyush Kaushik Bhattacharyya
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        <h1 className="font-serif text-5xl text-center mt-2 tracking-wide">
          Welcome to my Portfolio
        </h1>
        <p className="mt-4 text-center text-sm md:text-medium text-white/60">
          A Pre-Final Year Student specializing in AI/ML, MERN
        </p>
      </div>

      {/* Link to About Page */}
      <div className="flex justify-center mt-6">
        <Link href="#about">
          <button className="font-serif bg-yellow-400 text-black py-3 px-8 text-xl font-semibold rounded-lg hover:bg-yellow-500 transition-all z-2">
            Learn More About Me
          </button>
        </Link>
      </div>
    </div>
  );
};
