import {combineReducers} from 'redux'
import {get} from 'utils/utils'
import * as t from './actionTypes'
import {PageItems, Pages} from './model'

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
                    urlPath: get(rawPage, 'acf', 'url_path'),
                    menuIcon: get(rawPage, 'acf', 'menu_icon'),
                    children: [],
                }
            }
            // Add pages to the children array of their parent
            for(const rawPage of action.data) {
                const parent = get(rawPage, 'parent')
                if(parent !== 0) {
                    pages[parent] = {
                        ...pages[parent],
                        children: [...pages[parent].children, get(rawPage, 'id')],
                    }
                }
            }
            return pages
        default:
            return state
    }
}

// Reduce the top-level pages to an array
function rootItems(state: PageItems = [], action: t.PagesAction): PageItems {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            return action.data
                // parent=0 are top-level items
                .filter((rawMenuEntry) => get(rawMenuEntry, 'parent') === 0)
                // Sort by menu_order
                .sort((a: object, b: object) => (get(a, 'menu_order') > get(b, 'menu_order') ? 1 : -1))
                // Reduce to array of ids
                .map((rawMenuEntry) => get(rawMenuEntry, 'id'))
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

export const pages = combineReducers({byId, isFetching, rootItems})
