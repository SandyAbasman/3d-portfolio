'use client'

import { useState } from 'react'
import Cube from './components/Cube'
import Menu from './components/Menu'
import ProjectModal from './components/ProjectModal'

export default function Home() {
  const [activeSide, setActiveSide] = useState<'front' | 'right' | 'back' | 'left' | 'top' | 'bottom'>('front')
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSideChange = (side: 'front' | 'right' | 'back' | 'left' | 'top' | 'bottom') => {
    setActiveSide(side)
  }

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
        <Cube activeSide={activeSide} onProjectClick={handleProjectClick} />
        <ProjectModal
          isOpen={isModalOpen}
          projectId={selectedProject}
          onClose={handleCloseModal}
        />
      </div>
    </main>
  )
}

