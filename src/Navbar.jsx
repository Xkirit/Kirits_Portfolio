import logo from './assets/calli2.png'
import { useLoading } from './context/LoadingContext';

export default function Navbar() {
  const { startPageTransition } = useLoading();

  const handleNavClick = (e, path) => {
    e.preventDefault();
    startPageTransition(path);
  };

  return (
    <>
      <div className="nav">
        <a href="/" className="p-3 items-center h-20" onClick={(e) => handleNavClick(e, '/')}>
          <img 
            src={logo} 
            alt="Kirit Raju" 
            className="h-1 w-auto object-contain" 
            style={{ opacity: 1 }}
          />
        </a>
        {/* <a href="/about" onClick={(e) => handleNavClick(e, '/about')}>About</a>
        <a href="/projects" onClick={(e) => handleNavClick(e, '/projects')}>Projects</a> */}
      </div>
    </>
  )
}
