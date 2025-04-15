import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLoading } from '../context/LoadingContext';

export default function Loader() {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const { setIsLoading, setLoadingComplete, isTransitioning, completeTransition } = useLoading();

  useEffect(() => {
    if (!loaderRef.current) return;
    
    const blocks = loaderRef.current.querySelectorAll('.block');
    // Create an array from blocks NodeList and reverse it to animate right-to-left
    const blocksArray = Array.from(blocks).reverse();
    
    // Create a timeline for coordinated animations
    const tl = gsap.timeline({
      onComplete: () => {
        if (isTransitioning) {
          // When transitioning to a new page, complete the transition
          completeTransition();
        } else {
          // Initial page load completion
          setIsLoading(false);
          setLoadingComplete(true);
        }
      }
    });
    
    if (isTransitioning) {
      // For transitions: start with invisible blocks 
      gsap.set(blocks, { 
        width: '0%',
        opacity: 0 // Start completely invisible to prevent flash
      });
      
      // Fade in blocks from right to left
      tl.to(blocks, {
        opacity: 1,
        duration: 0.1,
        stagger: 0.01,
        ease: 'power2.in'
      });
      
      // Animate width after opacity is set - from right to left
      tl.to(blocks, {
        width: '5%',
        duration: 0.4,
        ease: 'power2.in',
        stagger: 0.02
      }, "-=0.2");
       
      
      
      // Then fade and shrink blocks away - from right to left
      tl.to(blocksArray, {
        width: '0%',
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.02
      });
      
      // Fade out opacity at the end - from right to left
      tl.to(blocksArray, {
        opacity: 0,
        duration: 0.1,
        stagger: 0.01,
        ease: 'power2.out'
      }, "-=0.3");
    } else {
      // Initial page load: start with full blocks and animate away
      gsap.set(blocks, { 
        width: '5%',
        opacity: 1 
      });
      
      // Hide all content initially
      gsap.set(".nav a, .about p, .sub-header a, .wrapper-img img", { 
        opacity: 0 
      });
      
      // Add text fade out to the timeline
      tl.to(textRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.7 // Shorter delay for initial load
      });
      
      // Then animate blocks away - from right to left for initial load too
      tl.to(blocksArray, {
        width: '0%',
        duration: 0.4,
        ease: 'power2.in',
        stagger: 0.02
      }, "-=0.3");
      
      // Fade out opacity at the end - from right to left
      tl.to(blocks, {
        opacity: 0,
        duration: 0.1,
        stagger: 0.01,
        ease: 'power2.in'
      }, "-=0.2");
    }
    
    return () => {
      // Clean up animation if component unmounts
      tl.kill();
    };
  }, [setIsLoading, setLoadingComplete, isTransitioning, completeTransition]);

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="overlay">
        {!isTransitioning && <p className="loader" ref={textRef}>WELCOME</p>}
        <div className="block block1"></div>
        <div className="block block2"></div>
        <div className="block block3"></div>
        <div className="block block4"></div>
        <div className="block block5"></div>
        <div className="block block6"></div>
        <div className="block block7"></div>
        <div className="block block8"></div>
        <div className="block block9"></div>
        <div className="block block10"></div>
        <div className="block block11"></div>
        <div className="block block12"></div>
        <div className="block block13"></div>
        <div className="block block14"></div>
        <div className="block block15"></div>
        <div className="block block16"></div>
        <div className="block block17"></div>
        <div className="block block18"></div>
        <div className="block block19"></div>
        <div className="block block20"></div>
        <div className="block block21"></div>
      </div>
    </div>
  );
}