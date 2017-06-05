import {DrawerState} from 'modules/drawer/model'
import {drawer} from 'modules/drawer/reducer'
import {NewsItemsState} from 'modules/news/model'
import {newsItems} from 'modules/news/reducer'
import {PagesState} from 'modules/pages/model'
import {pages} from 'modules/pages/reducer'
import {Menus} from 'modules/routing/model'
import {menus} from 'modules/routing/reducer'
import {ServersState} from 'modules/servers/model'
import {servers} from 'modules/servers/reducer'
import {combineReducers} from 'redux'

export interface AppState {
    servers: ServersState
    menus: Menus
    pages: PagesState
    drawer: DrawerState
    newsItems: NewsItemsState
}

export const rootReducer = combineReducers({
    servers,
    menus,
    pages,
    drawer,
    newsItems,
})
