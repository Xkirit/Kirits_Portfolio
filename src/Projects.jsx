import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLoading } from './context/LoadingContext';

export default function Projects() {
  const projectsRef = useRef(null);
  const { loadingComplete } = useLoading();
  const [animationsInitialized, setAnimationsInitialized] = useState(false);
  
  // Hide all content until GSAP is initialized
  const hiddenStyle = {
    opacity: 0,
    visibility: animationsInitialized ? 'visible' : 'hidden'
  };

  useEffect(() => {
    // Only run animations after loading is completely finished
    if (!loadingComplete || !projectsRef.current) return;

    const title = projectsRef.current.querySelector('.projects-title');
    const titleHighlight = projectsRef.current.querySelector('.title-highlight');
    const items = projectsRef.current.querySelectorAll('.project-card');
    const bullets = projectsRef.current.querySelectorAll('.bullet-point');
    
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
    
    // Animate project cards from left to right
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
    
    // Add hover animations for project cards
    items.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const projectName = card.querySelector('.project-name');
        gsap.to(projectName, {
          opacity: 1,
          scale: 1.1,
          duration: 0.4,
          ease: "power2.out"
        });
      });
      
      card.addEventListener('mouseleave', () => {
        const projectName = card.querySelector('.project-name');
        gsap.to(projectName, {
          opacity: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.in"
        });
      });
    });
    
    return () => tl.kill();
  }, [loadingComplete]);

  return (
    <div className="experience" ref={projectsRef}>
      <div className="experience-content bg-transparent">
        <h1 className="projects-title experience-title font-poppins text-center" style={hiddenStyle}>
          <span className="greeting-highlight font-poppins">Featured</span> Projects
        </h1>
        
        <div className="exp-cards-container md:flex-col lg:flex-row md:columns-2 max-h-full lg:max-h-[54vh]">
          {/* XyzDotApp */}
          <a 
            href="https://xyzapp.vercel.app" 
            target="_blank" 
            rel="noreferrer noopener" 
            className="purple-glow-card max-h-[50vh] exp-card project-card" 
            style={{...hiddenStyle, position: 'relative'}}
          >
            <div className="exp-card-content">
              <div className="exp-header">
                <h2 className="job-title font-poppins">XyzDotApp</h2>
                <div className="tech-stack">
                  <span className="job-period font-poppins">NextJs 15, React Query, Prisma, PostgreSQL, Tailwind CSS</span>
                </div>
              </div>
              
              <ul className="achievements">
                <li className="bullet-point font-poppins">Built a scalable social media platform with Next.js API Routes and Prisma ORM.</li>
                <li className="bullet-point font-poppins">Used React Query to reduce API calls by 50% and improve load times by 20%.</li>
                <li className="bullet-point font-poppins">Integrated infinite scrolling, optimistic updates, and advanced caching for a smooth UX.</li>
              </ul>
              
              <div className="project-name font-poppins">XyzDotApp</div>
            </div>
          </a>
          
          {/* ChainVote */}
          <a 
            href="https://chain-vote.vercel.app" 
            target="_blank" 
            rel="noreferrer noopener" 
            className="indigo-glow-card exp-card project-card" 
            style={{...hiddenStyle, position: 'relative'}}
          >
            <div className="exp-card-content">
              <div className="exp-header">
                <h2 className="job-title font-poppins">ChainVote</h2>
                <div className="tech-stack">
                  <span className="job-period font-poppins">NextJs 15, Solidity, Ethers.js, IPFS, Tailwind CSS</span>
                </div>
              </div>
              
              <ul className="achievements">
                <li className="bullet-point font-poppins">Engineered a decentralized voting platform using Ethereum smart contracts and Next.js</li>
                <li className="bullet-point font-poppins">Developed a decentralized voting platform on Ethereum with optimized gas costs by 40%</li>
                <li className="bullet-point font-poppins">Ensured 99.9% uptime via decentralized architecture and IPFS-based candidate data storage</li>
              </ul>
              
              <div className="project-name font-poppins">ChainVote</div>
            </div>
          </a>
          
          {/* TradeScribe */}
          <a 
            href="#" 
            target="_blank" 
            rel="noreferrer noopener" 
            className="green-glow-card exp-card project-card" 
            style={{...hiddenStyle, position: 'relative'}}
          >
            <div className="exp-card-content">
              <div className="exp-header">
                <h2 className="job-title font-poppins">TradeScribe</h2>
                <div className="tech-stack">
                  <span className="job-period font-poppins">ReactJs, Spring, ExpressJs, NodeJs, MongoDB, JWT, Bcrypt</span>
                </div>
              </div>
              
              <ul className="achievements">
                <li className="bullet-point font-poppins">Created a full-stack trade journal app with analytics and data visualization</li>
                <li className="bullet-point font-poppins">Secured authentication with JWT & Bcrypt, ensuring encrypted user data</li>
                <li className="bullet-point font-poppins">Refactored backend services to Java (Spring Boot) for improved performance and security</li>
              </ul>
              
              <div className="project-name font-poppins">TradeScribe</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
