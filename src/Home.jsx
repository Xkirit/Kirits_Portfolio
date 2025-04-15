import Navbar from './Navbar'
import Subheader from './components/subheader'
import Image from './Image'
import About from './About'
import gsap from 'gsap'
import Loader from './components/Loading'
import { useEffect, useState } from 'react'
import { useLoading } from './context/LoadingContext'

export default function Home() {
  const { loadingComplete } = useLoading();
  const [imagesReady, setImagesReady] = useState(false);
  
  // Prefetch image to avoid flashing
  useEffect(() => {
    const prefetchImage = document.querySelector('.wrapper-img img');
    if (prefetchImage) {
      // When image is ready, mark as ready
      if (prefetchImage.complete) {
        setImagesReady(true);
      } else {
        prefetchImage.onload = () => setImagesReady(true);
      }
    }
  }, []);
  
  useEffect(() => {
    // Only run animations after loading is completely finished and images are ready
    if (!loadingComplete || !imagesReady) return;
    
    const tl = gsap.timeline({
      delay: 0.2
    });
    
    // Now we can safely animate in our content
    tl.to(".nav a, .sub-header a", {
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out"
    });
    
    tl.to(".wrapper-img img", {
      opacity: 1,
      visibility: 'visible',
      duration: 1.4,
      ease: "power2.in",
      y: 0,
      from: { y: "20px" }
    }, "-=0.4"); // Slight overlap
    
    return () => tl.kill();
  }, [loadingComplete, imagesReady]);
  
  return (
    <div className="flex flex-col lg:flex-row h-max items-center justify-center w-full px-4 min-h-[80vh]">
      {/* <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl"> */}
        <About />
       
          <Image />
        
     
    </div>
  )
}
