import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const middlewares = [
  thunkMiddleware
]

//是dev环境才引入
if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = compose(
  applyMiddleware(...middlewares),
)

export default function configStore () {
  const store = createStore(rootReducer, enhancer)
  return store
}
