'use client'

export type Side = 'front' | 'right' | 'back' | 'left' | 'top' | 'bottom'

interface CubeProps {
  activeSide: Side
  onProjectClick?: (projectId: number) => void
}

export default function Cube({ activeSide, onProjectClick }: CubeProps) {
  return (
    <section className="scene">
      <div className={`cube show-${activeSide}`} data-side={activeSide}>
        <CubeFaceFront />
        <CubeFaceBack />
        <CubeFaceRight />
        <CubeFaceLeft />
        <CubeFaceTop onProjectClick={onProjectClick} />
        <CubeFaceBottom />
      </div>
    </section>
  )
}

function CubeFaceFront() {
  return (
    <div className="cube-face cube-face-front">
      <div className="intro-wrapper df fd-r">
        <div className="intro">
          <h1 className="intro-heading">
            Hi, I&apos;m Sandy, a <span>Software</span> Developer
          </h1>
          <p className="intro-text">
            I&apos;m Sandy Abasman, a Software Developer and UI UX Designer
            building user focused web applications and automation systems
            that drive real business value.
          </p>
          <p className="intro-text">
            I specialize in modern frontend development with React,
            Next.js, TypeScript, and Tailwind CSS, creating clean,
            responsive, and scalable interfaces. I also design workflow
            automations with <strong> N8N </strong> to eliminate manual
            tasks and improve efficiency. I care about clean code, strong
            UX, and systems that scale without breaking.
          </p>
        </div>
        <div className="image df fd-r">
          <div className="image-wrapper">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQHl73QD8fyg7g/profile-displayphoto-shrink_400_400/B4EZdYio8fHIAo-/0/1749537165730?e=1768435200&v=beta&t=Wgq1rBM1jALX-etkqrqk3Ov-1ft9aX_rNiSMkElnZYQ"
              alt="Sandy Abasman"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function CubeFaceBack() {
  return (
    <div className="cube-face cube-face-back">
      <p className="intro-heading">Educa<span>tion</span></p>
      <div className="work-edu-section df fd-r">
        <h4 className="work-edu-heading date">2021-2023</h4>
        <div className="work-edu-info">
          <h4 className="work-edu-heading company">42 Abu Dhabi</h4>
          <ul>
            <li>Computer Software Engineering</li>
          </ul>
        </div>
      </div>

      <div className="work-edu-section df fd-r">
        <h4 className="work-edu-heading date">2018-2022</h4>
        <div className="work-edu-info">
          <h4 className="work-edu-heading company">University of Calabar</h4>
          <ul>
            <li>Bsc, Computer Science</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function CubeFaceRight() {
  return (
    <div className="cube-face cube-face-right">
      <p className="intro-heading">Wo<span>rk</span></p>
      <div className="work-edu-section df fd-r">
        <h4 className="work-edu-heading date">2025-2026</h4>
        <div className="work-edu-info">
          <h4 className="work-edu-heading company">Freelancing</h4>
          <ul>
            <li>
              Built and shipped responsive web applications using React,
              Next.js, and Tailwind CSS for clients across different
              industries.
            </li>
            <li>
              Collaborated directly with clients to translate ideas and
              business needs into scalable, user friendly digital
              products.
            </li>
            <li>
              Designed and implemented workflow automations with n8n to
              reduce manual processes and improve operational efficiency.
            </li>
          </ul>
        </div>
      </div>

      <div className="work-edu-section df fd-r">
        <h4 className="work-edu-heading date">2024-2025</h4>
        <div className="work-edu-info">
          <h4 className="work-edu-heading company">Frontend Developer</h4>
          <p>MVP Application & Game Design L.L.C.</p>
          <ul>
            <li>
              Built responsive, interactive UI using React, TypeScript,
              and Tailwind CSS.
            </li>
            <li>
              Worked closely with designers using Figma to deliver
              pixel-perfect interfaces
            </li>
            <li>
              Optimized UI performance and contributed to frontend
              architecture.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function CubeFaceLeft() {
  return (
    <div className="cube-face cube-face-left">
      <p className="intro-heading">Certi<span>fi</span>cates</p>
      <div className="certificate-section df fd-r">
        <h4 className="certificate-date">2024</h4>
        <h4 className="certificate-heading">
          UI/UX Designer (Dev and Design)
        </h4>
      </div>
      <div className="certificate-section df fd-r">
        <h4 className="certificate-date">2023</h4>
        <h4 className="certificate-heading">UI Developer (Dev and Design)</h4>
      </div>
      <div className="certificate-section df fd-r">
        <h4 className="certificate-date">2023</h4>
        <h4 className="certificate-heading">Webflow developer</h4>
      </div>
    </div>
  )
}

interface CubeFaceTopProps {
  onProjectClick?: (projectId: number) => void
}

function CubeFaceTop({ onProjectClick }: CubeFaceTopProps) {
  const projects = Array.from({ length: 6 }, (_, i) => i + 1)

  const handleProjectClick = (projectId: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (onProjectClick) {
      onProjectClick(projectId)
    }
  }

  return (
    <div className="cube-face cube-face-top">
      <p className="intro-heading"><span>Pro</span>jects</p>
      <div className="projects">
        {projects.map((num) => (
          <div
            key={num}
            className="project-border"
            onClick={(e) => handleProjectClick(num, e)}
            style={{ cursor: 'pointer' }}
          >
            <div className="project-wrapper">
              <div className="visit-wrapper">
                <p className="app-title">#{num} App</p>
                <div className="visit-app" onClick={(e) => handleProjectClick(num, e)} >
                  View Details <i className="fas fa-eye"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CubeFaceBottom() {
  return (
    <div className="cube-face cube-face-bottom">
      <p className="intro-heading">Con<span>tacts</span></p>
      <h4 className="work-edu-heading">
        <i className="fas fa-location-arrow"></i> Kranj, Slovenia
      </h4>
      <h4 className="work-edu-heading">
        <i className="far fa-envelope"></i> abasifrekesandy@gmail.com
      </h4>
      <h4 className="work-edu-heading">
        <i className="fas fa-phone"></i> +386 41 945 266
      </h4>

      <div className="social-media-btns">
        <a href="https://medium.com/@abasifrekesandy" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-medium"></i>
        </a>
        <a href="https://www.linkedin.com/in/abasifrekesandy/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/SandyAbasman" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
      </div>
    </div>
  )
}

