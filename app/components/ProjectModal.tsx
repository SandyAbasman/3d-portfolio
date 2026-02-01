'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface ProjectModalProps {
  isOpen: boolean
  projectId: number | null
  onClose: () => void
}

export default function ProjectModal({ isOpen, projectId, onClose }: ProjectModalProps) {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detect mobile viewport (for conditional rendering)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)

    return () => {
      window.removeEventListener('resize', updateIsMobile)
    }
  }, [])

  if (!isOpen || projectId === null) return null

  // Sample project data - you can replace this with actual project data
  const projectData = {
    1: {
      title: 'IntegraMind AI',
      shortDescription:
        'Where Business Minds Meet Intelligent Systems. AI-powered automation solutions for businesses.',
      description:
        'Where Business Minds Meet Intelligent Systems. IntegraMind AI helps organizations transform ambition into execution by embedding AI, automation, and data intelligence directly into their operations.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      image: '/integramind.png',
      link: '#',
      demoLink: 'https://www.integramindai.com/',
    },
    2: {
      title: 'Personal Finance Dashboard',
      shortDescription:
        'A comprehensive dashboard for managing personal finances with real-time tracking and insights.',
      description:
        'Personal finance dashboard for managing finance. Track your income, expenses, budgets, and savings all in one place with an intuitive and user-friendly interface.',
      technologies: ['React', 'Three.js', 'Framer Motion', 'CSS3'],
      image: '/personal finance app.png',
      link: '#',
      demoLink: 'https://mypersonalfinanceapp.netlify.app/',
    },
    3: {
      title: 'Axon UI',
      shortDescription:
        'Design Faster. Build Better. UI Library for Figma & React. Seamlessly integrate design and development with ready-to-use components',
      description:
        'A modern web application built with React and Next.js. This project showcases advanced UI/UX design principles and responsive layouts.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      image: '/AxonUI.png',
      link: '#',
      demoLink: 'https://www.figma.com/community/file/1462149115513609993/axon-ui-library',
    },
    4: {
      title: 'VDJ',
      shortDescription: 'Responsive dj marketing site with smooth animations and modern design.',
      description:
        'A responsive DJ marketing website featuring smooth animations powered by Framer Motion, built with Next.js, React, and TypeScript. The site showcases modern design principles with interactive elements and seamless user experience across all devices.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
      image: '/Vdj.png',
      link: '#',
      demoLink: 'https://vdjtest.netlify.app/',
    },
    5: {
      title: 'Groupio Landing',
      shortDescription:
        'Plan your group trip with Groupio. Experience the joy of effortless group travel.',
      description:
        'Plan your group trip with Groupio. Experience the joy of effortless group travel with Groupio. Get your group trip out of the group chat and start your next adventure today!',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      image: '/Grioupio.png',
      link: '#',
      demoLink: 'https://groupiotravel.com/',
    },
    6: {
      title: 'Resource App',
      shortDescription:
        'Effortlessly access and organize your preferred links and online resources all in one place.',
      description:
        'Effortlessly access and organize your preferred links and online resources all in one place.',
      technologies: ['JavaScript', 'Canvas API', 'WebGL', 'Phaser'],
      image: '/resoureApp.png',
      link: '#',
      demoLink: 'https://resourseapp.vercel.app/',
    },
  }

  const project = projectData[projectId as keyof typeof projectData]

  if (!project) return null

  return (
    <div className="project-cube-container" ref={containerRef}>
      <button className="project-close-btn" onClick={onClose} aria-label="Close project">
        <i className="fas fa-times"></i>
      </button>

      {/* Mobile layout */}
      <div className="project-mobile-image">
        <Image
          src={project.image}
          alt={project.title}
          width={500}
          height={300}
          style={{ width: '100%', height: 'auto' }}
        />
        <h2 className="project-cube-title">{project.title}</h2>

        {/* Technologies under title */}
        <div className="tech-tags" style={{ marginTop: '15px', marginBottom: '15px' }}>
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <p className="project-short-description">{project.shortDescription}</p>

        {project.demoLink && project.demoLink !== '#' && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-demo-btn"
          >
            <i className="fas fa-play"></i>
            View Demo
          </a>
        )}
      </div>

      {/* Desktop layout */}
      {!isMobile && (
        <section className="scene project-scene">
          <div className="cube show-front" data-side="front">
            {/* Front Face - Project Image with Technologies */}
            <div className="cube-face cube-face-front">
              <div className="project-image-face">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  style={{ width: '100%', height: 'auto', maxWidth: '500px' }}
                />
                <h2 className="project-cube-title">{project.title}</h2>

                {/* Technologies under title */}
                <div className="tech-tags" style={{ marginTop: '15px', marginBottom: '15px' }}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="project-short-description">{project.shortDescription}</p>

                {project.demoLink && project.demoLink !== '#' && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-demo-btn"
                  >
                    <i className="fas fa-play"></i>
                    View Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

