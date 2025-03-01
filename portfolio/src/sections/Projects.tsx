'use client';

import { useState, useEffect, forwardRef } from "react";
import { useCircleEffects } from "../components/effects"; 
import Link from "next/link";
import "../styles/effects.css"; 

const projects = [
  { 
    id: 1, 
    title: "Multiclass Arrhythmia Detection", 
    description: "A deep learning model leveraging a 1D-CNN-BiLSTM architecture for multiclass arrhythmia detection. Designed to analyze ECG data for accurate classification of arrhythmias, achieving high precision while optimizing for healthcare applications.", 
    github: "https://github.com/PiyushKBhattacharyya/arrthymia-study" 
  },
  { 
    id: 2, 
    title: "Brain-Tumor-Segmentation using UNet", 
    description: "Implemented brain tumor segmentation using the UNet architecture. Utilizes deep learning for medical image segmentation. Focused on MRI scans for tumor detection and classification.",   
    github: "https://github.com/PiyushKBhattacharyya/Brain-Tumor-Segmentation" 
  },
  { 
    id: 3, 
    title: "Automatic Machine Learning", 
    description: "Built an AutoML system for automated feature selection, model tuning, and performance evaluation. Deployed an interactive AI-driven dashboard for real-time model visualization",
    github: "https://github.com/PiyushKBhattacharyya/Brain-Tumor-Segmentation",
    live: "https://automl.streamlit.app/"
  },
  { 
    id: 4, 
    title: "Featureless Cloud Point Registration", 
    description: "Developed a featureless point cloud registration pipeline using Poisson disk sampling and ICP on Model 10 dataset",
    github: "https://github.com/PiyushKBhattacharyya/Featureless-Point-Cloud-Registration",
  },
];

export const ProjectSection = forwardRef<HTMLDivElement>((props, ref) => {
  const [isMounted, setIsMounted] = useState(false);
  const { circles, mousePos } = useCircleEffects();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      ref={ref}
      id="project"
      className="relative mt-40 md:mt-20 lg:mt-10 py-20 overflow-visible flex flex-col items-center"
    >
      {/* Floating Background Effect */}
      <div
        className="gradient-bg absolute pointer-events-none"
        style={{
          left: `${mousePos.x - 75}px`,
          top: `${mousePos.y - 75}px`,
        }}
      ></div>

      {/* Floating Circles Effect */}
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="circle"
          style={{
            position: "absolute",
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            backgroundColor: circle.color,
            opacity: circle.opacity,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
          }}
        />
      ))}

      {/* Section Header */}
      <div className="relative z-10 text-center">
        <h2 className="text-white text-4xl font-bold sm: mt-30">Projects</h2>
      </div>

      {/* Stacked Project Cards */}
      <div className="relative mt-5 w-full max-w-2xl flex flex-col items-center perspective-1000">
        {projects.map((project, index) => {
          const isSelected = selectedProject === project.id;
          const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 768;

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(isSelected ? null : project.id)}
              className={`relative w-[90%] md:w-[80%] lg:w-[70%] bg-white/10 backdrop-blur-md border border-white/15 rounded-lg p-6 text-white shadow-lg cursor-pointer transition-all duration-500 transform-gpu sm:transition-none sm:duration-0 sm:scale-100 ${
                isSelected && !isSmallScreen
                  ? "translate-x-10 scale-110 rotate-0 shadow-2xl sm:translate-x-0 sm:scale-100 sm:shadow-lg"
                  : "scale-95 rotate-[-2deg] shadow-md sm:rotate-0"
              }`}
              style={{
                position: isSmallScreen ? "relative" : "absolute",
                top: isSmallScreen ? "auto" : isSelected ? "50%" : `${index * 30}px`,
                left: isSmallScreen ? "auto" : isSelected ? "50%" : "0%",
                transform: isSmallScreen
                  ? "none"
                  : isSelected
                  ? "translate(-50%, -50%) scale(1.1)"
                  : "translateX(0px) scale(0.95)",
                zIndex: isSelected ? 100 : projects.length - index,
                transition: isSmallScreen
                  ? "none"
                  : "transform 0.5s ease-in-out, box-shadow 0.3s, top 0.5s ease-in-out, left 0.5s ease-in-out",
                marginBottom: isSmallScreen && isSelected ? "20px" : "0px",
              }}
            >
              {/* Title Always Visible */}
              <div
                className="absolute top-3 left-5 text-lg font-semibold text-white bg-black/40 px-3 py-1 rounded-md"
                style={{
                  opacity: isSelected ? 1 : 0.8,
                  zIndex: 100,
                }}
              >
                {project.title}
              </div>

              {/* Bookmark (Hidden when project title is viewed) */}
              {!isSelected && !isSmallScreen && (
                <div
                  className="absolute -left-6 top-1/2 transform -translate-y-1/2 -rotate-12 bg-yellow-400 text-black px-3 py-1 rounded-md font-semibold shadow-md"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  Project: {project.id}
                </div>
              )}

              {/* Project Content (Only visible if selected) */}
              {isSelected && (
                <div className="items-center mt-8 text-white/80">
                  <p>{project.description}</p>
                  
                  {/* GitHub and Live Server Button for Projects */}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block"
                    >
                      <img 
                        src="/assets/images/github.png" 
                        alt="GitHub" 
                        className="mt-4 w-10 h-10"
                      />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-center flex font-sans mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Live Preview
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
