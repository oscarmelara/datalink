import React, { createContext, useState } from 'react'
import { IGeneralContext } from './TS'
import { token } from './utils'

const Context = createContext({} as IGeneralContext)

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(token())

  const value = {
    isAuth,
    activateAuth: () => {
      setIsAuth(true)
    }
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default {
  Provider,
  Consumer: Context,
}
