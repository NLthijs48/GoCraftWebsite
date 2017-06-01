import {combineReducers} from 'redux'
import {get} from 'utils'
import {ServersData} from './model'
import * as t from './actionTypes'

// Server data reducer
const data = (state: ServersData = [], action: t.ServersAction) => {
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
                    image: get(rawServer, 'acf', 'feature_image', 'sizes', 'medium'),
                })
            }
            return servers
        default:
            return state
    }
}

// Fetching state reducer
const isFetching = (state: boolean = false, action: t.ServersAction) => {
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

export const servers = combineReducers({data, isFetching})
