import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'


import sayHello from './helloWorld'

export default (history) => combineReducers({
    sayHello, 
    router: connectRouter(history),
})