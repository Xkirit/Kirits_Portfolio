import Image from './Image'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useLoading } from './context/LoadingContext'

export default function About() {
  const aboutRef = useRef(null)
  const { loadingComplete } = useLoading()
  const [animationsInitialized, setAnimationsInitialized] = useState(false)
  
  // Hide all content until GSAP is initialized
  const hiddenStyle = {
    opacity: 0,
    visibility: animationsInitialized ? 'visible' : 'hidden'
  }
  
  useEffect(() => {
    // Only run animations after loading is completely finished
    if (!loadingComplete || !aboutRef.current) return
    
    const greeting = aboutRef.current.querySelector('.greeting')
    const highlight = aboutRef.current.querySelector('.greeting-highlight')
    const bio = aboutRef.current.querySelector('.bio')
    const bioContent = aboutRef.current.querySelectorAll('.bio > p')
    const skillsContainer = aboutRef.current.querySelector('.skills')
    const skills = aboutRef.current.querySelectorAll('.skill-tag')
    
    // Set initial states for all elements
    gsap.set([greeting, bio, skillsContainer], { 
      opacity: 0,
      y: 20,
      visibility: 'visible'
    })
    
    gsap.set(skills, { 
      opacity: 0,
      y: 10,
      scale: 0.95,
      visibility: 'visible'
    })
    
    // Mark animations as initialized so React can update visibility
    setAnimationsInitialized(true)
    
    // Create main animation timeline
    const tl = gsap.timeline({
      delay: 0.3, // Small delay to ensure everything is ready
      defaults: {
        ease: "power2.out"
      }
    })
    
    // Animate greeting with highlight
    tl.to(greeting, {
      opacity: 1,
      y: 0,
      duration: 0.6
    })
    
    tl.to(highlight, {
      color: "#dcff7c", // Ensure highlight color animates
      duration: 0.4
    }, "-=0.3")
    
    // Animate bio content
    tl.to(bio, {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, "-=0.2")
    
    tl.to(bioContent, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.5
    }, "-=0.4")
    
    // Animate skills with staggered effect
    tl.to(skillsContainer, {
      opacity: 1,
      duration: 0.4
    }, "-=0.2")
    
    tl.to(skills, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.05,
      duration: 0.4
    }, "-=0.2")
    
    return () => tl.kill()
  }, [loadingComplete])

  return (
    <div className="about w-full md:w-1/6 lg:w-1/5 md:ml-0 lg:ml-4 justify-center mb-28" ref={aboutRef}>
      <div className="about-content w-full md:max-w-none py-4">
        <h1 className="greeting" style={hiddenStyle}>
          <span className="greeting-highlight">Hello,</span> <span>I'm Kirit</span>
        </h1>
        
        <div className="bio" style={hiddenStyle}>
          <p>
            I craft responsive, user-centered digital experiences with a focus on 
            clean code and thoughtful interactions. With expertise in React and 
            modern web technologies, I transform ideas into engaging applications.
          </p>
          
          <div className="skills" style={hiddenStyle}>
            <span className="skill-tag">React</span>
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">TypeScript</span>
            <span className="skill-tag">GSAP</span>
            <span className="skill-tag">Tailwind</span>
            <span className="skill-tag">UI/UX</span>
          </div>
          
          <p className="currently">
            Currently focused on building interactive web experiences
            with smooth animations and optimized performance.
          </p>
        </div>
      </div>
    </div>
  )
}

