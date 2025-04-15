import './App.css'
import Loader from './components/Loading'
import Home from './Home'
import About from './About'
import Navbar from './Navbar'
import Subheader from './components/subheader'
import Experience from './Experience'
import Projects from './Projects'
import Contact from './Contact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoadingProvider, useLoading } from './context/LoadingContext'

function AppContent() {
  const { isLoading, isTransitioning, preFadeOut } = useLoading();
  
  // Only show content when not loading, not in pre-fade phase, and not transitioning
  const contentVisible = !isLoading && !isTransitioning && !preFadeOut;
  
  return (
    <>
      {/* Show loader during initial load or transitions, but not during pre-fade phase */}
      {(isLoading || isTransitioning) && <Loader />}
      
      {/* Content container - always visible but opacity controlled by state */}
      <div style={{ 
        visibility: 'visible', // Always visible for smooth fades
        opacity: contentVisible ? 1 : 0,
        transition: preFadeOut ? 'opacity 0.3s ease-in' : 'opacity 0.1 ease-out', // Match transition timing with content animations
        pointerEvents: contentVisible ? 'auto' : 'none' // Disable interactions when fading
      }}>
        <Navbar />
        <Subheader />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </Router>
  )
}

export default App
