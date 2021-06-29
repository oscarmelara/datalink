import React from 'react'
import { Particles } from '../../components'
import { SectionBlue } from '../auth/style'

export const ParticlesLayout: React.FC<{ className?: string }> = ({ children, className = '' }) => {
  return (<SectionBlue className={`flex-column flex-lg-row pt-5 py-lg-0 ${className}`}>
    {children}

    <Particles
      id='particles-js-top'
      density={170}
      w={680}
      style={{
        height: '300px',
        position: 'absolute',
        right: '-90px',
        top: '-150px',
        transform: 'rotate(23deg)',
        width: '650px',
      }} />
    <Particles
      id='particles-js-bottom'
      density={160}
      w={680}
      style={{
        bottom: '-125px',
        height: '300px',
        position: 'absolute',
        right: '-125px',
        transform: 'rotate(-30deg)',
        width: '600px',
      }} />
  </SectionBlue>)
}
