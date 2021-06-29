import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Context from './Context'
import App from './App'
import { store } from './config'
import './styles/custom.sass'

ReactDOM.render(
  <Context.Provider>
    <Provider store={store}>
      <App />
    </Provider>
  </Context.Provider>,
  document.getElementById('root')
)
