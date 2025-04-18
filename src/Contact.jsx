import { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import SubHeader from './components/subheader';
import { gsap } from 'gsap';
import { useLoading } from './context/LoadingContext';

export default function Contact() {
  const contactRef = useRef(null);
  const { loadingComplete, startPageTransition } = useLoading();
  const [animationsInitialized, setAnimationsInitialized] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Hide all content until GSAP is initialized
  const hiddenStyle = {
    opacity: 0,
    visibility: animationsInitialized ? 'visible' : 'hidden'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real application, you would handle form submission to your backend here
    
    // Show thank you modal
    setShowThankYouModal(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleCloseModal = () => {
    // Close the modal
    setShowThankYouModal(false);
    
    // Redirect to home page
    startPageTransition('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    // Only run animations after loading is completely finished
    if (!loadingComplete || !contactRef.current) return;

    const title = contactRef.current.querySelector('.contact-title');
    const form = contactRef.current.querySelector('form');
    const inputs = contactRef.current.querySelectorAll('input, textarea');
    const button = contactRef.current.querySelector('button');
    
    // Also select navbar and subheader elements
    const navLinks = document.querySelectorAll(".nav a");
    const subheaderLinks = document.querySelectorAll(".sub-header a");
    
    // Set initial states for all elements
    gsap.set([title, form, button], { 
      opacity: 0,
      y: 20,
      visibility: 'visible'
    });
    
    gsap.set(inputs, {
      opacity: 0,
      y: 10,
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
    
    // Animate title
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, "-=0.1");
    
    // Animate form
    tl.to(form, {
      opacity: 1,
      y: 0,
      duration: 0.5
    }, "-=0.3");
    
    // Animate inputs with stagger
    tl.to(inputs, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.4
    }, "-=0.3");
    
    // Animate button
    tl.to(button, {
      opacity: 1,
      y: 0,
      duration: 0.4
    }, "-=0.2");
    
    return () => tl.kill();
  }, [loadingComplete]);

  return (
    <div className="h-[70vh] flex items-center justify-center mt-24 pb-20 bg-black" ref={contactRef}>
      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          {/* Backdrop with stronger blur effect */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg transition-all duration-300 ease-in-out"
            onClick={handleCloseModal}
          ></div>
          
          {/* Modal content with enhanced styling */}
          <div className="bg-[#111] border border-[#dcff7c] rounded-xl p-8 max-w-md w-11/12 mx-4 z-10 transform transition-all duration-500 scale-100 opacity-100 shadow-[0_0_30px_rgba(220,255,124,0.2)] relative">
            {/* Accent line at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#dcff7c] to-transparent opacity-80 rounded-t-xl"></div>
            
            <div className="text-center">
              {/* Checkmark icon */}
              <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-[#142200] flex items-center justify-center border border-[#dcff7c]">
                <svg className="w-8 h-8 text-[#dcff7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-[#dcff7c] font-marcellus tracking-wide">Thank You!</h2>
              <p className="text-gray-200 mb-8 font-marcellus leading-relaxed">
                I've received your message and will get back to you as soon as possible.
              </p>
              
              <button
                onClick={handleCloseModal}
                className="w-full bg-[#dcff7c] text-black font-semibold py-4 px-6 rounded-xl hover:bg-[#839753] transition-all duration-300 hover:cursor-pointer shadow-[0_0_15px_rgba(220,255,124,0.3)] hover:shadow-[0_0_20px_rgba(220,255,124,0.4)]"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl touch flex flex-col gap-5 items-center justify-center px-6 py-12">
        <h1 className="contact-title touch text-5xl font-bold mb-10 text-center font-marcellus" style={hiddenStyle}>
          <span className="text-[#dcff7c] title-highlight">Get in Touch</span> 
        </h1>
        
        <div className="w-full max-w-xl">
          <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-5" style={hiddenStyle}>
            <div className="flex flex-col gap-5">
              <div className="group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-5 px-6 h-10 bg-[#111] rounded-xl text-gray-200 border border-[#222] focus:border-[#dcff7c] focus:shadow-[0_0_8px_rgba(220,255,124,0.3)] transition-all duration-300 ease-in-out outline-none placeholder-gray-600 group-hover:border-[#444]"
                  placeholder=" Your name"
                  required
                />
              </div>
              
              <div className="group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-10 p-5 px-6 bg-[#111] rounded-xl text-gray-200 border border-[#222] focus:border-[#dcff7c] focus:shadow-[0_0_8px_rgba(220,255,124,0.3)] transition-all duration-300 ease-in-out outline-none placeholder-gray-600 group-hover:border-[#444]"
                  placeholder=" your@email.com"
                  required
                />
              </div>
              
              <div className="group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full p-5 px-6 bg-[#111] rounded-xl text-gray-200 border border-[#222] focus:border-[#dcff7c] focus:shadow-[0_0_8px_rgba(220,255,124,0.3)] transition-all duration-300 ease-in-out outline-none resize-none placeholder-gray-600 group-hover:border-[#444]"
                  placeholder=" What would you like to say?"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full h-12 bg-[#dcff7c] text-black font-semibold hover:bg-[#839753] hover:shadow-[0_0_12px_rgba(220,255,124,0.4)] active:bg-[#b3d75e] transition-all duration-300 rounded-xl hover:cursor-pointer"
              style={hiddenStyle}
            >
              Send Message
            </button>
            
            <p className="text-center text-gray-500 text-sm mt-3">
              I'll respond to your message as soon as possible.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}