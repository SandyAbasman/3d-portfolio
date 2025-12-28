'use client'

import { useState } from 'react'

interface ProjectModalProps {
  isOpen: boolean
  projectId: number | null
  onClose: () => void
}

export default function ProjectModal({ isOpen, projectId, onClose }: ProjectModalProps) {
  const [activeSide, setActiveSide] = useState<'front' | 'right' | 'back' | 'left' | 'top' | 'bottom'>('front')

  if (!isOpen || projectId === null) return null

  // Sample project data - you can replace this with actual project data
  const projectData = {
    1: {
      title: 'Project #1',
      shortDescription: 'A modern social media platform with real-time messaging and interactive features.',
      description: 'A modern web application built with React and Next.js. This project showcases advanced UI/UX design principles and responsive layouts.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      image: 'https://cdn.pixabay.com/photo/2022/12/10/21/41/social-media-7647812_1280.jpg',
      link: '#',
      demoLink: '#',
    },
    2: {
      title: 'Project #2',
      shortDescription: 'Cinema booking system with real-time seat selection and secure payment processing.',
      description: 'An innovative cinema booking system with real-time seat selection and payment integration.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://cdn.pixabay.com/photo/2019/11/07/20/48/cinema-4609877_1280.jpg',
      link: '#',
      demoLink: '#',
    },
    3: {
      title: 'Project #3',
      shortDescription: 'E-commerce platform for flower delivery with intuitive shopping experience.',
      description: 'A beautiful e-commerce platform for flower delivery with advanced filtering and search capabilities.',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      image: 'https://cdn.pixabay.com/photo/2017/02/15/13/40/tulips-2068692_1280.jpg',
      link: '#',
      demoLink: '#',
    },
    4: {
      title: 'Project #4',
      shortDescription: 'Creative portfolio website with stunning animations and interactive 3D elements.',
      description: 'A creative portfolio website with unique animations and interactive elements.',
      technologies: ['React', 'Three.js', 'Framer Motion', 'CSS3'],
      image: 'https://cdn.pixabay.com/photo/2015/09/03/17/50/cobweb-921039_1280.jpg',
      link: '#',
      demoLink: '#',
    },
    5: {
      title: 'Project #5',
      shortDescription: '3D visualization tool for architectural designs with immersive real-time rendering.',
      description: 'A 3D visualization tool for architectural designs with real-time rendering.',
      technologies: ['React', 'Three.js', 'WebGL', 'Blender'],
      image: 'https://cdn.pixabay.com/photo/2016/02/27/12/40/sculpture-1225487_1280.jpg',
      link: '#',
      demoLink: '#',
    },
    6: {
      title: 'Project #6',
      shortDescription: 'Interactive puzzle game with complex maze navigation and engaging mechanics.',
      description: 'An interactive game with complex maze navigation and puzzle-solving mechanics.',
      technologies: ['JavaScript', 'Canvas API', 'WebGL', 'Phaser'],
      image: 'https://cdn.pixabay.com/photo/2016/10/13/15/23/labyrinth-1738039_1280.jpg',
      link: '#',
      demoLink: '#',
    },
  }

  const project = projectData[projectId as keyof typeof projectData]

  if (!project) return null

  const handleSideChange = (side: 'front' | 'right' | 'back' | 'left' | 'top' | 'bottom') => {
    setActiveSide(side)
  }

  return (
    <div className="project-cube-container">
      <button className="project-close-btn" onClick={onClose} aria-label="Close project">
        <i className="fas fa-times"></i>
      </button>
      <section className="scene project-scene">
        <div className={`cube show-${activeSide}`} data-side={activeSide}>
          {/* Front Face - Project Image */}
          <div className="cube-face cube-face-front">
            <div className="project-image-face">
              <img src={project.image} alt={project.title} />
              <h2 className="project-cube-title">{project.title}</h2>
              <p className="project-short-description">{project.shortDescription}</p>
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-demo-btn"
              >
                <i className="fas fa-play"></i>
                View Demo
              </a>
            </div>
          </div>

          {/* Back Face - Description */}
          <div className="cube-face cube-face-back">
            <div className="project-content-face">
              <h3 className="project-section-title">Description</h3>
              <p className="project-description-text">{project.description}</p>
            </div>
          </div>

          {/* Right Face - Technologies */}
          <div className="cube-face cube-face-right">
            <div className="project-content-face">
              <h3 className="project-section-title">Technologies</h3>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Left Face - Project Info */}
          <div className="cube-face cube-face-left">
            <div className="project-content-face">
              <h3 className="project-section-title">Project Details</h3>
              <div className="project-details">
                <p><strong>Title:</strong> {project.title}</p>
                <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Top Face - Visit Link */}
          <div className="cube-face cube-face-top">
            <div className="project-content-face">
              <h3 className="project-section-title">Visit Project</h3>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-visit-btn"
              >
                <i className="fas fa-external-link-alt"></i>
                Open Project
              </a>
            </div>
          </div>

          {/* Bottom Face - Navigation */}
          <div className="cube-face cube-face-bottom">
            <div className="project-content-face">
              <h3 className="project-section-title">Navigate</h3>
              <div className="project-nav-btns">
                <button onClick={() => handleSideChange('front')} className="project-nav-btn">Image</button>
                <button onClick={() => handleSideChange('back')} className="project-nav-btn">Description</button>
                <button onClick={() => handleSideChange('right')} className="project-nav-btn">Tech</button>
                <button onClick={() => handleSideChange('left')} className="project-nav-btn">Details</button>
                <button onClick={() => handleSideChange('top')} className="project-nav-btn">Visit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

