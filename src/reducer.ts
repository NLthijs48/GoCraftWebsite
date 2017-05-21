import {combineReducers} from 'redux'
import servers from './modules/servers/reducer'
import {ServersState} from './modules/servers/model'
import {Menus} from './modules/routing/model'
import menus from './modules/routing/reducer'

export interface AppState {
    servers: ServersState
    menus: Menus
}

export default combineReducers({
    servers,
    menus,
})
