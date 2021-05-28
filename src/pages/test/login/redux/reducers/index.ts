import { combineReducers } from 'redux'
import user from './user'

//通过combineReducers 调用 每个reducer函数的state, 并封装成一个新的总state对象返回
export default combineReducers({
  ...user
})

