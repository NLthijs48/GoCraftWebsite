import {combineReducers} from 'redux'
import {get} from 'utils/utils'
import * as t from './actionTypes'
import {ServersData, ServersState} from './model'

// Server data reducer
function data(state: ServersData = [], action: t.ServersAction): ServersData {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Get the properties we need from the WordPress data
            const servers = []
            for(const rawServer of action.data) {
                const slug = get(rawServer, 'slug')
                if(typeof slug !== 'string') {
                    console.error('Server has no slug:', rawServer)
                    continue
                }
                servers.push({
                    slug,
                    name: get(rawServer, 'title', 'rendered'),
                    shortDescription: get(rawServer, 'acf', 'description'),
                    longDescription: get(rawServer, 'acf', 'details'),
                    image: get(rawServer, 'acf', 'feature_image', 'sizes', 'medium_large'),
                    dynmapLink: get(rawServer, 'acf', 'dynmap_link'),
                    order: get(rawServer, 'menu_order'),
                    bungeeID: get(rawServer, 'acf', 'bungee_id'),
                    steamID: get(rawServer, 'acf', 'steam_id'),
                    gameType: get(rawServer, 'acf', 'game_type', 'value'),
                })
            }
            servers.sort((a, b) => a.order-b.order)
            return servers
        default:
            return state
    }
}

// Fetching state reducer
function isFetching(state: boolean = false, action: t.ServersAction): boolean {
    switch(action.type) {
        case t.FETCH:
            return true
        case t.FETCH_SUCCESS:
        case t.FETCH_FAILURE:
            return false
        default:
            return state
    }
}

export const servers = combineReducers<ServersState>({data, isFetching})
