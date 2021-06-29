import React from 'react'
import { TitleSection, ContentSection } from '../styles/style'

interface IDashboardSection extends React.HTMLAttributes<HTMLDivElement> {
  raw?: boolean
  title?: string
  titleIcon?: JSX.Element
  contentClass?: string
}

export const DashboardSection: React.FC<IDashboardSection> = ({ children, title, raw = false, className = '', titleIcon = null, contentClass = '' }) => {
  return (<TitleSection className={`mt-3 mb-4 ${className}`}>
    {(title || titleIcon) && (<h2>{title}{titleIcon}</h2>)}
    {raw ?
      (<div className={`${contentClass} content`}>{children}</div>) :
      (<ContentSection className={`${contentClass} bg-blue`}>{children}</ContentSection>)
    }
  </TitleSection>)
}
