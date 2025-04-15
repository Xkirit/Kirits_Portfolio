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
      <div className="nav flex justify-center py-4">
        <a 
          href="/" 
          className="p-3 flex items-center" 
          onClick={(e) => handleNavClick(e, '/')}
        >
          <img 
            src={logo} 
            alt="Kirit Raju" 
            className="h-auto w-auto max-h-16 object-contain" 
            style={{ opacity: 1 }}
          />
        </a>
      </div>
    </>
  )
}
