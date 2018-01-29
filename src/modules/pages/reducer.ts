import {combineReducers} from 'redux'
import {get} from 'utils/utils'
import * as t from './actionTypes'
import {PageItems, Pages, PagesState} from './model'

// Server data reducer
function byId(state: Pages = {}, action: t.PagesAction): Pages {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Get the properties we need from the WordPress byId
            const newPages: Pages = {...state}
            for(const rawPage of action.data) {
                newPages[get(rawPage, 'id')] = {
                    title: get(rawPage, 'title', 'rendered'),
                    status: get(rawPage, 'status'),
                    type: get(rawPage, 'acf', 'page_type'),
                    url: get(rawPage, 'acf', 'website_link'),
                    embedNewTab: get(rawPage, 'acf', 'embed_new_tab'),
                    content: get(rawPage, 'acf', 'content'),
                    urlPath: get(rawPage, 'acf', 'url_path'),
                    menuIcon: get(rawPage, 'acf', 'menu_icon'),
                    adminOnly: get(rawPage, 'acf', 'admin_only'),
                    children: [],
                }
            }
            // Add pages to the children array of their parent
            for(const rawPage of action.data) {
                const parent = get(rawPage, 'parent')
                if(parent !== 0) {
                    newPages[parent].children.push(get(rawPage, 'id'))
                }
            }
            return newPages
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
function isFetching(state: boolean = false, action: t.PagesAction): boolean {
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

export const pages = combineReducers<PagesState>({byId, isFetching, rootItems})
