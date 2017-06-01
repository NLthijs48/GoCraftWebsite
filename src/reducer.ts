import {combineReducers} from 'redux'
import {servers} from 'modules/servers/reducer'
import {ServersState} from 'modules/servers/model'
import {Menus} from 'modules/routing/model'
import {menus} from 'modules/routing/reducer'
import {pages} from 'modules/pages/reducer'
import {PagesState} from 'modules/pages/model'

export interface AppState {
    servers: ServersState
    menus: Menus
    pages: PagesState
}

export const rootReducer = combineReducers({
    servers,
    menus,
    pages,
})
