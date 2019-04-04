import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'


import busGeoInfo from './busGeoInfo'

export default (history) => combineReducers({
    busGeoInfo, 
    router: connectRouter(history),
})