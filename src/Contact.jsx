import { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import SubHeader from './components/subheader';
import { gsap } from 'gsap';
import { useLoading } from './context/LoadingContext';

export default function Contact() {
  const contactRef = useRef(null);
  const { loadingComplete } = useLoading();
  const [animationsInitialized, setAnimationsInitialized] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
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
    <div className="min-h-screen bg-black" ref={contactRef}>
      <div className="flex justify-center items-center w-full h-full pt-20 pb-16 mx-auto">
        {/* Main content container */}
        <div className="w-full max-w-xl px-6">
          <h1 className="contact-title text-5xl font-bold mb-10 text-center font-domine" style={hiddenStyle}>
            <span className="text-[#dcff7c]">Get in</span> Touch
          </h1>
          
          {isSubmitted && (
            <div className="bg-[#142200] border border-[#dcff7c] text-[#dcff7c] p-4 rounded-xl mb-8 text-center">
              Thank you for your message! I'll get back to you soon.
            </div>
          )}
          
          <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col space-y-8" style={hiddenStyle}>
            <div className="space-y-6">
              <div className="group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 bg-[#111] rounded-xl text-gray-200 border border-[#222] focus:border-[#dcff7c] focus:shadow-[0_0_8px_rgba(220,255,124,0.3)] transition-all duration-300 ease-in-out outline-none placeholder-gray-600 group-hover:border-[#444]"
                  placeholder="Your name"
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
                  className="w-full p-4 bg-[#111] rounded-xl text-gray-200 border border-[#222] focus:border-[#dcff7c] focus:shadow-[0_0_8px_rgba(220,255,124,0.3)] transition-all duration-300 ease-in-out outline-none placeholder-gray-600 group-hover:border-[#444]"
                  placeholder="your@email.com"
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
                  className="w-full p-4 bg-[#111] rounded-xl text-gray-200 border border-[#222] focus:border-[#dcff7c] focus:shadow-[0_0_8px_rgba(220,255,124,0.3)] transition-all duration-300 ease-in-out outline-none resize-none placeholder-gray-600 group-hover:border-[#444]"
                  placeholder="What would you like to say?"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-4 bg-[#dcff7c] text-black font-semibold hover:bg-[#c2e66d] hover:shadow-[0_0_12px_rgba(220,255,124,0.4)] active:bg-[#b3d75e] transition-all duration-300 rounded-xl mt-2"
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