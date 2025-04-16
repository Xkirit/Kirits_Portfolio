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
            className="w-auto max-h-10 sm:h-10 md:h-24 md:max-h-16  lg:max-w-[300px] md:max-w-[200px] object-contain" 
            style={{ opacity: 1 }}
          />
        </a>
      </div>
    </>
  )
}
