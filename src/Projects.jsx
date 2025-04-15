import { useEffect } from 'react';
import gsap from 'gsap';

export default function Projects() {
  useEffect(() => {
    // Animate projects content on mount
    gsap.from('.project-card', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }, []);

  const projects = [
    {
      title: 'Project 1',
      description: 'Description of project 1',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      title: 'Project 2', 
      description: 'Description of project 2',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
      link: '#'
    },
    {
      title: 'Project 3',
      description: 'Description of project 3', 
      technologies: ['React Native', 'Firebase'],
      link: '#'
    }
  ];

  return (
    <div className="projects-container p-8">
      <h1 className="text-4xl font-bold mb-8 text-[#dcff7c]">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="project-card bg-[#1a1a1a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#bdbdbd]">{project.title}</h2>
            <p className="text-[#969696] mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-[#2a2a2a] text-[#dcff7c] rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            
            <a 
              href={project.link}
              className="inline-block px-6 py-2 bg-[#dcff7c] text-black rounded-lg hover:bg-[#c2e66d] transition-colors"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
