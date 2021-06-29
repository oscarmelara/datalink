import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'

const Layout: React.FC = ({ children }) => {
  return (<section id="main">
    {children}
  </section>)
}

export default memo(withRouter(Layout))