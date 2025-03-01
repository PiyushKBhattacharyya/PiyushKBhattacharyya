'use client';

import { Header } from "../sections/Header";
import { HeroSection } from "../sections/Hero";
import About from "../sections/About";
import { ProjectSection } from "@/sections/Projects";
import { useRef } from "react";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <About ref={aboutRef} />
      <ProjectSection ref={projectRef} />
    </main>
  );
}
