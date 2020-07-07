import { createStore } from 'redux'
import combineReducers from './reducers'

import { compose } from 'redux'


const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

const store = () => createStore(combineReducers, composeEnhancers())

export default store
