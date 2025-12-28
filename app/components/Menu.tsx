'use client'

import { useState } from 'react'
import { Side } from './Cube'

interface MenuProps {
  onSideChange: (side: Side) => void
  activeSide: Side
}

const menuItems = [
  { label: 'Intro', side: 'front' as Side },
  { label: 'Work', side: 'right' as Side },
  { label: 'Education', side: 'back' as Side },
  { label: 'Certificates', side: 'left' as Side },
  { label: 'Projects', side: 'top' as Side },
  { label: 'Contacts', side: 'bottom' as Side },
]

export default function Menu({ onSideChange, activeSide }: MenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuClick = (side: Side) => {
    onSideChange(side)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Menu */}
      <div className="menu menu-desktop df fd-c">
        {menuItems.map((item) => (
          <button
            key={item.side}
            className={`btn ${activeSide === item.side ? 'active' : ''}`}
            onClick={() => onSideChange(item.side)}
            data-side={item.side}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="menu-mobile">
        <button
          className="hamburger-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        <div className={`dropdown-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {menuItems.map((item) => (
            <button
              key={item.side}
              className={`dropdown-item ${activeSide === item.side ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.side)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

