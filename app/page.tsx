"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Cube from './components/Cube'
import Menu from './components/Menu'
import ProjectModal from './components/ProjectModal'

type CubeSide = 'front' | 'right' | 'back' | 'left' | 'top' | 'bottom'

const sidesOrder: CubeSide[] = ['front', 'right', 'back', 'left', 'top', 'bottom']

const sideLabels: Record<CubeSide, string> = {
  front: 'About',
  right: 'Work', 
  back: 'Education',
  left: 'Certification',
  top: 'Projects',
  bottom: 'Contact'
}

export default function Home() {
  const [activeSide, setActiveSide] = useState<CubeSide>('front')
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const lastScrollTime = useRef<number>(0)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const handleSideChange = (side: CubeSide) => {
    setActiveSide(side)
  }

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

  // Scroll to change cube side (desktop)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isModalOpen) return

      // Only react to vertical scroll
      if (Math.abs(e.deltaY) < 5) return

      const now = Date.now()
      if (now - lastScrollTime.current < 500) return
      lastScrollTime.current = now

      if (e.deltaY > 0) {
        goToNextSide()
      } else {
        goToPrevSide()
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [isModalOpen, goToNextSide, goToPrevSide])

  // Swipe to change cube side (mobile)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (isModalOpen) return
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isModalOpen || !touchStartRef.current) return

      const end = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      }

      const deltaX = end.x - touchStartRef.current.x
      const deltaY = end.y - touchStartRef.current.y
      const minSwipe = 40

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipe) {
        // Horizontal swipe: right = previous, left = next
        if (deltaX > 0) {
          goToPrevSide()
        } else {
          goToNextSide()
        }
      }

      touchStartRef.current = null
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isModalOpen, goToNextSide, goToPrevSide])

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <main className={isModalOpen ? 'two-cubes' : ''}>
      <Menu onSideChange={handleSideChange} activeSide={activeSide} />
      <div className="cubes-wrapper">
        <div className="main-cube-container">
          <Cube activeSide={activeSide} onProjectClick={handleProjectClick} />
          
          {/* Navigation arrows under the main cube */}
          {!isModalOpen && (
            <div className="cube-nav-arrows main-cube-nav">
              <button 
                className="cube-nav-arrow cube-nav-prev" 
                onClick={goToPrevSide}
                aria-label="Previous section"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              <div className="cube-nav-info">
                <span className="cube-nav-current">{sideLabels[activeSide]}</span>
                <div className="cube-nav-dots">
                  {sidesOrder.map((side) => (
                    <span 
                      key={side}
                      className={`cube-nav-dot ${activeSide === side ? 'active' : ''}`}
                      onClick={() => setActiveSide(side)}
                      title={sideLabels[side]}
                    />
                  ))}
                </div>
                <span className="cube-swipe-label">Swipe</span>
              </div>
              
              <button 
                className="cube-nav-arrow cube-nav-next" 
                onClick={goToNextSide}
                aria-label="Next section"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
        
        <ProjectModal
          isOpen={isModalOpen}
          projectId={selectedProject}
          onClose={handleCloseModal}
        />
      </div>
    </main>
  )
}

