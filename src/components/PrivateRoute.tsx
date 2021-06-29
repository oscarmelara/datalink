import React, { useContext } from 'react'
import { RouteProps, Redirect, Route } from 'react-router'

import Context from '../Context'

export const PrivateRoute = ({ component, render, children, ...routeProps }: RouteProps) => {
  const { isAuth } = useContext(Context.Consumer)

  if (isAuth) {
    return (<Route component={component} render={render} children={children} {...routeProps} />)
  } else {
    return (<Redirect to='/' />)
  }
}