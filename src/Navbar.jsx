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
            className="w-auto max-h-10 sm:h-10 md:h-12 max-w-[120px]  lg:max-w-[400px] md:max-h-[50px] lg:max-h-[75px] md:max-w-[120px] object-contain" 
            style={{ opacity: 1 }}
          />
        </a>
      </div>
    </>
  )
}
