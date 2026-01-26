'use client'

import { useState, useCallback } from 'react'
import Cube from './components/Cube'
import Menu from './components/Menu'
import ProjectModal from './components/ProjectModal'

type CubeSide = 'front' | 'right' | 'back' | 'left' | 'top' | 'bottom'

const sidesOrder: CubeSide[] = ['front', 'right', 'back', 'left', 'top', 'bottom']

const sideLabels: Record<CubeSide, string> = {
  front: 'About',
  right: 'Projects', 
  back: 'Experience',
  left: 'Skills',
  top: 'Contact',
  bottom: 'More'
}

export default function Home() {
  const [activeSide, setActiveSide] = useState<CubeSide>('front')
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

