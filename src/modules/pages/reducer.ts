import {combineReducers} from 'redux'
import {get} from 'utils'
import {Pages} from './model'
import * as t from './actionTypes'

// Server data reducer
const byId = (state: Pages = {}, action: t.PagesAction) => {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Get the properties we need from the WordPress byId
            const pages: Pages = {...state}
            for(const rawPage of action.data) {
                pages[get(rawPage, 'id')] = {
                    type: get(rawPage, 'acf', 'page_type'),
                    url: get(rawPage, 'acf', 'website_link'),
                    content: get(rawPage, 'acf', 'content'),
                }
            }
            return pages
        default:
            return state
    }
}

// Fetching state reducer
const isFetching = (state: boolean = false, action: t.PagesAction) => {
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

export const pages = combineReducers({byId, isFetching})
