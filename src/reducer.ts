import {combineReducers} from 'redux'
import servers from './modules/servers/reducer'
import {State} from './modules/servers/model'

export interface AppState {
    servers: State
}

export default combineReducers({
    servers,
})
