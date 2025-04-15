import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

// Create context with default values
const LoadingContext = createContext({
  isLoading: true,
  loadingComplete: false,
  isTransitioning: false,
  preFadeOut: false,
  setIsLoading: () => {},
  setLoadingComplete: () => {},
  startPageTransition: () => {}
});

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [preFadeOut, setPreFadeOut] = useState(false);
  const [nextPath, setNextPath] = useState('');
  const navigate = useNavigate();

  const startPageTransition = (path) => {
    // First start the pre-fade out phase
    setPreFadeOut(true);
    setLoadingComplete(false);
    setNextPath(path);
    
    // Fade out content before starting the transition animation
    const fadeOutTl = gsap.timeline({
      onComplete: () => {
        // After content fades out, start the actual transition
        setPreFadeOut(false);
        setIsTransitioning(true);
      }
    });
    
    // Fade out content from right to left
    // Create a consistent visual flow by staggering from right side first
    
    // First fade out right side elements
    fadeOutTl.to(".wrapper-img img, .sub-header a", {
      opacity: 0,
      duration: 0.2,
      stagger: {
        from: "end", // Start from the last element
        each: 0.02
      },
      ease: "power2.in"
    });
    
    // Then main content with slight delay
    fadeOutTl.to(".about p, .exp-item, .aboutme, .nav a", {
      opacity: 0,
      duration: 0.3,
      stagger: {
        from: "end", // Start from the last element
        each: 0.05
      },
      ease: "power2.in"
    }, "-=0.1");
  };

  const completeTransition = () => {
    if (nextPath) {
      navigate(nextPath);
      setNextPath('');
    }
    setIsTransitioning(false);
    setLoadingComplete(true);
  };

  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      setIsLoading, 
      loadingComplete, 
      setLoadingComplete,
      isTransitioning,
      preFadeOut,
      startPageTransition,
      completeTransition
    }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext); 