import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLoading } from './context/LoadingContext';

export default function Experience() {
  const experienceRef = useRef(null);
  const { loadingComplete } = useLoading();
  const [animationsInitialized, setAnimationsInitialized] = useState(false);
  
  // Hide all content until GSAP is initialized
  const hiddenStyle = {
    opacity: 0,
    visibility: animationsInitialized ? 'visible' : 'hidden'
  };

  useEffect(() => {
    // Only run animations after loading is completely finished
    if (!loadingComplete || !experienceRef.current) return;

    const title = experienceRef.current.querySelector('.experience-title');
    const titleHighlight = experienceRef.current.querySelector('.title-highlight');
    const items = experienceRef.current.querySelectorAll('.exp-card');
    const bullets = experienceRef.current.querySelectorAll('.bullet-point');
    
    // Also select navbar and subheader elements
    const navLinks = document.querySelectorAll(".nav a");
    const subheaderLinks = document.querySelectorAll(".sub-header a");
    
    // Set initial states for all elements
    gsap.set([title, items], { 
      opacity: 0,
      y: 20,
      visibility: 'visible'
    });
    
    gsap.set(bullets, {
      opacity: 0,
      x: -5,
      scale: 0.9,
      visibility: 'visible'
    });
    
    // Set initial state for navbar and subheader
    gsap.set([navLinks, subheaderLinks], {
      opacity: 0,
      visibility: 'visible'
    });
    
    // Mark animations as initialized so React can update visibility
    setAnimationsInitialized(true);
    
    // Create main animation timeline
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "power2.out"
      }
    });
    
    // First animate subheader elements from right to left
    tl.to(subheaderLinks, {
      opacity: 1,
      duration: 0.3,
      stagger: {
        from: "end", // Start from the right
        each: 0.05
      }
    });
    
    // Then animate navbar items from right to left
    tl.to(navLinks, {
      opacity: 1,
      duration: 0.3,
      stagger: {
        from: "end", // Start from the right
        each: 0.05
      }
    }, "-=0.2");
    
    // Animate title with highlight
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, "-=0.1");
    
    tl.to(titleHighlight, {
      color: "#dcff7c",
      duration: 0.4
    }, "-=0.3");
    
    // Animate experience cards from left to right
    tl.to(items, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.5
    }, "-=0.2");
    
    // Animate bullet points within all cards
    tl.to(bullets, {
      opacity: 1,
      x: 0,
      scale: 1,
      stagger: 0.05,
      duration: 0.3
    }, "-=0.3");
    
    return () => tl.kill();
  }, [loadingComplete]);

  return (
    <div className="experience  px-4 py-8 md:mb-14 md:py-16" ref={experienceRef}>
      <div className="experience-content mx-auto max-w-6xl">
        <h1 className="experience-title font-poppins mb-12 text-center" style={hiddenStyle}>
          <span className="title-highlight">Professional</span> Experience
        </h1>
        
        <div className="exp-cards-container justify-center">
          {/* Valsco Technology */}
          <a href="https://www.valscotech.com/" target="_blank" rel="noopener noreferrer">
          <div className="exp-card purple-glow-card h-full" style={hiddenStyle}>
            <div className="exp-card-content">
              <div className="exp-header">
                <h2 className="job-title font-poppins">Frontend Intern</h2>
                <span className="job-period font-poppins">February 2025 - Current</span>
              </div>
              <h3 className="company-name font-poppins">Valsco Technology</h3>
              <p className="job-description font-poppins">
                Vellore, India
              </p>
              <ul className="achievements">
                <li className="bullet-point font-poppins">Spearheaded development of the Jurident web application</li>
                <li className="bullet-point font-poppins">Developed the landing page for the Smart Tech Hackathon using NextJs</li>
                <li className="bullet-point font-poppins">Built backend using API Routes and Google API to store user data in sheets</li>
              </ul>
            </div>
          </div>
          </a>
          {/* OMIFCO */}
          <a href="https://www.omifco.com/" target="_blank" rel="noopener noreferrer">
          <div className="exp-card indigo-glow-card h-[52vh]" style={hiddenStyle}>
            <div className="exp-card-content">
              <div className="exp-header">
                <h2 className="job-title font-poppins">Software Intern</h2>
                <span className="job-period font-poppins">Oct 2023 - Nov 2023</span>
              </div>
              <h3 className="company-name font-poppins">Oman India Fertilizer Company</h3>
              {/* <p className="job-description font-poppins">Sur, Oman</p> */}
              <ul className="achievements">
                <li className="bullet-point font-poppins">Developed Material Flow App with Oracle APEX, reducing manual work by 20%</li>
                <li className="bullet-point font-poppins">Managed Oracle SQL databases with 1,000+ records for efficient reporting</li>
                <li className="bullet-point font-poppins">Automated HR processes using Oracle Fusion, cutting task time by 25%</li>
                <li className="bullet-point font-poppins">Improved system performance by 10% through infrastructure optimization</li>
              </ul>
            </div>
          </div>
          </a>
        </div>
      </div>
    </div>
  );
} 