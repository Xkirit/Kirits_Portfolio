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
    <div className="experience" ref={experienceRef}>
      <div className="experience-content">
        <h1 className="experience-title" style={hiddenStyle}>
          <span className="title-highlight">Professional</span> Experience
        </h1>
        
        <div className="exp-cards-container">
          <div className="exp-card" style={hiddenStyle}>
            <div className="exp-card-content">
              <div className="exp-header">
                <h2 className="job-title">Senior Developer</h2>
                <span className="job-period">2021 - Present</span>
              </div>
              <h3 className="company-name">SoftTech Innovations</h3>
              
              <p className="job-description">
                Led development of key product features, mentored junior developers, and implemented
                modern frontend architecture using React and related technologies.
              </p>
              
              <ul className="achievements">
                <li className="bullet-point">Improved application performance by 40% through code optimization</li>
                <li className="bullet-point">Implemented CI/CD pipeline reducing deployment time by 60%</li>
                <li className="bullet-point">Architected and built responsive UI components used across multiple products</li>
              </ul>
            </div>
          </div>
          
          <div className="exp-card" style={hiddenStyle}>
            <div className="exp-card-content">
              <div className="exp-header">
                <h2 className="job-title">Frontend Developer</h2>
                <span className="job-period">2018 - 2021</span>
              </div>
              <h3 className="company-name">Digital Solutions Ltd.</h3>
              
              <p className="job-description">
                Developed and maintained client-facing web applications with focus on performance
                and accessibility.
              </p>
              
              <ul className="achievements">
                <li className="bullet-point">Built interactive dashboards using React and D3.js</li>
                <li className="bullet-point">Collaborated with design team to implement pixel-perfect UIs</li>
                <li className="bullet-point">Reduced bundle size by 35% through code splitting and lazy loading</li>
              </ul>
            </div>
          </div>
          
          <div className="exp-card" style={hiddenStyle}>
            <div className="exp-card-content">
              <div className="exp-header">
                <h2 className="job-title">Junior Web Developer</h2>
                <span className="job-period">2016 - 2018</span>
              </div>
              <h3 className="company-name">Creative Web Agency</h3>
              
              <p className="job-description">
                Worked on various client projects developing responsive websites and web applications.
              </p>
              
              <ul className="achievements">
                <li className="bullet-point">Developed responsive websites for small to medium businesses</li>
                <li className="bullet-point">Implemented SEO best practices across client projects</li>
                <li className="bullet-point">Created reusable component libraries to improve development efficiency</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 