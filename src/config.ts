import reduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reducers from './reducers'

// Redux
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk)),
)
