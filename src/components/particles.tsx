import React, { useEffect } from 'react'

interface IParticles {
  id: string
  style?: {
    [s: string]: string | number
  },
  w?: number
  density?: number
  className?: string
}

export const Particles: React.FC<IParticles> = ({ id, style, w = 720, density = 80, className = '' }) => {  
  useEffect(() => {
    if (document.querySelector(`#${id}`)) {
      particlesJS(id, {
        particles: {
          number: {
            value: density,
            density: {
              enable: true,
              value_area: (w/2),
            }
          },
          move: {
            speed: 1,
          },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: { value: 3 },
          line_linked: {
            enable: true,
            distance: 100,
            color: '#ffffff',
            opacity: 0.4,
            width: 2,
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: false },
            onclick: { enable: false },
            resize: true,
          },
        },
        retina_detect: true,
      })
    }
  }, [id, w, density])

  return (
    <div className={className} style={style} id={id} />
  )
}
