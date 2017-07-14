import {DrawerState} from 'modules/drawer/model'
import {drawer} from 'modules/drawer/reducer'
import {NewsItemsState} from 'modules/news/model'
import {newsItems} from 'modules/news/reducer'
import {OptionsState} from 'modules/options/model'
import {options} from 'modules/options/reducer'
import {PagesState} from 'modules/pages/model'
import {pages} from 'modules/pages/reducer'
import {PlayersState} from 'modules/players/model'
import {players} from 'modules/players/reducer'
import {ServersState} from 'modules/servers/model'
import {servers} from 'modules/servers/reducer'
import {ShopLayoutState} from 'modules/shop/model'
import {shopLayout} from 'modules/shop/reducer'
import {VoteSitesState} from 'modules/votesites/model'
import {voteSites} from 'modules/votesites/reducer'
import {combineReducers} from 'redux'

export interface AppState {
    servers: ServersState
    pages: PagesState
    drawer: DrawerState
    newsItems: NewsItemsState
    voteSites: VoteSitesState
    options: OptionsState
    players: PlayersState
    shopLayout: ShopLayoutState
    reducerVersion: number
}

const reducerVersion = (state: number = 0, action: { type: string }) => {
    switch(action.type) {
        case 'REDUCER_UPDATED':
            return state + 1
        default:
            return state
    }
}

export const rootReducer = combineReducers<AppState>({
    servers,
    pages,
    drawer,
    newsItems,
    voteSites,
    options,
    players,
    shopLayout,
    reducerVersion,
})
