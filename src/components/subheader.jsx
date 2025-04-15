import { useLoading } from '../context/LoadingContext';
import { useEffect, useRef } from 'react';

export default function Subheader() {
  const { startPageTransition } = useLoading();
  const subheaderRef = useRef(null);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    startPageTransition(path);
  };

  // Apply rolling text effect after component mounts
  useEffect(() => {
    if (!subheaderRef.current) return;
    
    // Process the rolling text effect with a slight delay to ensure DOM is ready
    setTimeout(() => {
      const elements = subheaderRef.current.querySelectorAll('.rolling-text');
      
      elements.forEach((element) => {
        // Only process elements that haven't been processed yet
        if (element.querySelector('.block')) return;
        
        // Get the text directly 
        let innerText = element.textContent.trim();
        
        // Clear the element but save any existing classnames
        const className = element.className;
        element.innerHTML = '';
        element.className = className;
  
        // Create first text block
        const textContainer = document.createElement('div');
        textContainer.classList.add('block');
  
        // Iterate over innerText
        for (let letter of innerText) { 
          const span = document.createElement('span');
          span.textContent = letter.trim() === "" ? "\xa0" : letter;
          span.classList.add('letter');
          textContainer.appendChild(span);
        }
  
        // Add original and duplicate text blocks for the rolling effect
        element.appendChild(textContainer);
        element.appendChild(textContainer.cloneNode(true));
      });
    }, 10);
  }, []);

  return (
    <div className="sub-header absolute bottom-2 w-full flex backdrop-blur-xs flex-wrap justify-center md:justify-between overflow-wrap mb-10 gap-2 md:gap-0" ref={subheaderRef}>
      <a href="#" className="rolling-text contact-link font-domine" onClick={(e) => handleNavClick(e, '/contact')}>
        →WORK WITH ME
      </a>
      <a href="/experience" className="rolling-text font-marcellus" onClick={(e) => handleNavClick(e, '/experience')}>
        Experience
      </a>
      <a href="/projects" className="rolling-text font-marcellus" onClick={(e) => handleNavClick(e, '/projects')}>
        Projects
      </a>
      <a href="https://github.com/xKirit" className="rolling-text font-marcellus" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      <a href="https://www.linkedin.com/in/tadi-kiriti-raju-15545b299/" className="rolling-text font-marcellus" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
    </div>
  );
}
