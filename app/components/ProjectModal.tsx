'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

interface ProjectModalProps {
  isOpen: boolean
  projectId: number | null
  onClose: () => void
}

type CubeSide = 'front' | 'right' | 'back' | 'left' | 'top' | 'bottom'

export default function ProjectModal({ isOpen, projectId, onClose }: ProjectModalProps) {
  const [activeSide, setActiveSide] = useState<CubeSide>('front')
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const lastScrollTime = useRef<number>(0)
  const isSwiping = useRef<boolean>(false)

  // Define the order of sides for navigation
  const sidesOrder: CubeSide[] = ['front', 'right', 'back', 'left', 'top', 'bottom']

  // Navigate to next/prev side
  const goToNextSide = useCallback(() => {
    setActiveSide(prev => {
      const currentIndex = sidesOrder.indexOf(prev)
      return sidesOrder[(currentIndex + 1) % sidesOrder.length]
    })
  }, [])

  const goToPrevSide = useCallback(() => {
    setActiveSide(prev => {
      const currentIndex = sidesOrder.indexOf(prev)
      return sidesOrder[(currentIndex - 1 + sidesOrder.length) % sidesOrder.length]
    })
  }, [])

  // Handle scroll/wheel events (desktop)
  useEffect(() => {
    if (!isOpen) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      // Throttle scroll events
      const now = Date.now()
      if (now - lastScrollTime.current < 500) return
      lastScrollTime.current = now

      if (e.deltaY > 0) {
        goToNextSide()
      } else if (e.deltaY < 0) {
        goToPrevSide()
      }
    }

    // Attach to document to capture all wheel events when modal is open
    document.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      document.removeEventListener('wheel', handleWheel)
    }
  }, [isOpen, goToNextSide, goToPrevSide])

  // Handle touch/swipe events (mobile) - attached to document for reliability
  useEffect(() => {
    if (!isOpen) return

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      
      // Don't capture touches on interactive elements
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('swipe-dot')
      ) {
        touchStartRef.current = null
        isSwiping.current = false
        return
      }
      
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
      isSwiping.current = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return
      
      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const deltaX = Math.abs(currentX - touchStartRef.current.x)
      const deltaY = Math.abs(currentY - touchStartRef.current.y)
      
      // If moved more than 10px, we're swiping - prevent scroll
      if (deltaX > 10 || deltaY > 10) {
        isSwiping.current = true
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }

      const deltaX = touchEnd.x - touchStartRef.current.x
      const deltaY = touchEnd.y - touchStartRef.current.y
      const minSwipeDistance = 30 // Reduced for easier swiping

      // Determine swipe direction
      if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0) {
            goToPrevSide() // Swipe right = previous
          } else {
            goToNextSide() // Swipe left = next
          }
        } else {
          // Vertical swipe
          if (deltaY > 0) {
            goToPrevSide() // Swipe down = previous
          } else {
            goToNextSide() // Swipe up = next
          }
        }
      }

      touchStartRef.current = null
      isSwiping.current = false
    }

    // Attach to document for reliable mobile touch capture
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isOpen, goToNextSide, goToPrevSide])

  if (!isOpen || projectId === null) return null

  // Sample project data - you can replace this with actual project data
  const projectData = {
    1: {
      title: 'Axon UI',
      shortDescription: "Design Faster. Build Better. UI Library for Figma & React. Seamlessly integrate design and development with ready-to-use components",
      description: 'A modern web application built with React and Next.js. This project showcases advanced UI/UX design principles and responsive layouts.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      image: '/AxonUI.png',
      link: '#',
      demoLink: 'https://github.com/SandyAbasman/Axon-UI',
    },
    2: {
      title: 'Personal Finance Dashboard',
      shortDescription: 'A comprehensive dashboard for managing personal finances with real-time tracking and insights.',
      description: 'Personal finance dashboard for managing finance. Track your income, expenses, budgets, and savings all in one place with an intuitive and user-friendly interface.',
      technologies: ['React', 'Three.js', 'Framer Motion', 'CSS3'],
      image: '/personal finance app.png',
      link: '#',
      demoLink: 'https://mypersonalfinanceapp.netlify.app/',
    },
    3: {
      title: 'IntegraMind AI',
      shortDescription: 'Where Business Minds Meet Intelligent Systems. AI-powered automation solutions for businesses.',
      description: 'Where Business Minds Meet Intelligent Systems. IntegraMind AI helps organizations transform ambition into execution by embedding AI, automation, and data intelligence directly into their operations.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      image: '/integramind.png',
      link: '#',
      demoLink: 'https://integra-mind-ai.vercel.app/',
    },
    4: {
      title: 'VDJ',
      shortDescription: 'Responsive dj marketing site with smooth animations and modern design.',
      description: 'A responsive DJ marketing website featuring smooth animations powered by Framer Motion, built with Next.js, React, and TypeScript. The site showcases modern design principles with interactive elements and seamless user experience across all devices.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
      image: '/Vdj.png',
      link: '#',
      demoLink: 'https://vdjtest.netlify.app/',
    },
    5: {
      title: 'Groupio Landing',
      shortDescription: 'Plan your group trip with Groupio. Experience the joy of effortless group travel.',
      description: 'Plan your group trip with Groupio. Experience the joy of effortless group travel with Groupio. Get your group trip out of the group chat and start your next adventure today!',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      image: '/Grioupio.png',
      link: '#',
      demoLink: 'https://groupiotravel.com/',
    },
    6: {
      title: 'Resource App',
      shortDescription: 'Effortlessly access and organize your preferred links and online resources all in one place.',
      description: 'Effortlessly access and organize your preferred links and online resources all in one place.',
      technologies: ['JavaScript', 'Canvas API', 'WebGL', 'Phaser'],
      image: '/resoureApp.png',
      link: '#',
      demoLink: 'https://resourseapp.vercel.app/',
    },
  }

  const project = projectData[projectId as keyof typeof projectData]

  if (!project) return null

  const handleSideChange = (side: 'front' | 'right' | 'back' | 'left' | 'top' | 'bottom') => {
    setActiveSide(side)
  }

  return (
    <div 
      className="project-cube-container" 
      ref={containerRef}
    >
      <button className="project-close-btn" onClick={onClose} aria-label="Close project">
        <i className="fas fa-times"></i>
      </button>
      <div className="project-mobile-image">
        {/* Mobile swipe indicator */}
        <div className="mobile-swipe-indicator">
          {sidesOrder.map((side, index) => (
            <span 
              key={side} 
              className={`swipe-dot ${activeSide === side ? 'active' : ''}`}
              onClick={() => setActiveSide(side)}
            />
          ))}
        </div>
        
        {/* Front - Main project info */}
        {activeSide === 'front' && (
          <>
            <Image 
              src={project.image} 
              alt={project.title}
              width={500}
              height={300}
              style={{ width: '100%', height: 'auto' }}
            />
            <h2 className="project-cube-title">{project.title}</h2>
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
          </>
        )}
        
        {/* Back - Description */}
        {activeSide === 'back' && (
          <div className="mobile-content-section">
            <h3 className="project-section-title">Description</h3>
            <p className="project-description-text">{project.description}</p>
          </div>
        )}
        
        {/* Right - Technologies */}
        {activeSide === 'right' && (
          <div className="mobile-content-section">
            <h3 className="project-section-title">Technologies</h3>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Left - Project Details */}
        {activeSide === 'left' && (
          <div className="mobile-content-section">
            <h3 className="project-section-title">Project Details</h3>
            <div className="project-details">
              <p><strong>Title:</strong> {project.title}</p>
              <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
            </div>
          </div>
        )}
        
        {/* Top - Visit Link */}
        {activeSide === 'top' && (
          <div className="mobile-content-section">
            <h3 className="project-section-title">Visit Project</h3>
            {project.demoLink && project.demoLink !== '#' && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-visit-btn"
              >
                <i className="fas fa-external-link-alt"></i>
                Open Project
              </a>
            )}
          </div>
        )}
        
        {/* Bottom - Navigation hint */}
        {activeSide === 'bottom' && (
          <div className="mobile-content-section">
            <h3 className="project-section-title">Navigation</h3>
            <p className="project-description-text">Swipe left or right to explore different sections of this project.</p>
            <div className="project-nav-btns">
              <button onClick={() => setActiveSide('front')} className="project-nav-btn">Overview</button>
              <button onClick={() => setActiveSide('back')} className="project-nav-btn">Description</button>
              <button onClick={() => setActiveSide('right')} className="project-nav-btn">Technologies</button>
            </div>
          </div>
        )}
        
        <p className="swipe-hint">Swipe to explore</p>
      </div>
      
      <section className="scene project-scene">
        <div className={`cube show-${activeSide}`} data-side={activeSide}>
          {/* Front Face - Project Image */}
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

          {/* Back Face - Description */}
          <div className="cube-face cube-face-back">
            <div className="project-content-face">
              <h3 className="project-section-title">Description</h3>
              <p className="project-description-text">{project.description}</p>
            </div>
          </div>

          {/* Right Face - Technologies */}
          {/* <div className="cube-face cube-face-right">
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
          </div> */}

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
      
      {/* Navigation arrows under the cube */}
      <div className="cube-nav-arrows">
        <button 
          className="cube-nav-arrow cube-nav-prev" 
          onClick={goToPrevSide}
          aria-label="Previous section"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <div className="cube-nav-info">
          <span className="cube-nav-current">{activeSide.charAt(0).toUpperCase() + activeSide.slice(1)}</span>
          <div className="cube-nav-dots">
            {sidesOrder.map((side) => (
              <span 
                key={side}
                className={`cube-nav-dot ${activeSide === side ? 'active' : ''}`}
                onClick={() => setActiveSide(side)}
              />
            ))}
          </div>
        </div>
        
        <button 
          className="cube-nav-arrow cube-nav-next" 
          onClick={goToNextSide}
          aria-label="Next section"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}

