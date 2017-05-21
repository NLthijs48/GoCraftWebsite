import {combineReducers} from 'redux'
import {get} from '../../utils'
import * as t from './actionTypes'
import {MenuData, MenuItems, Menus} from './model'

// MenuData data reducer
function menuData(state: MenuData = {}, action: t.MenusAction): MenuData {
    console.log('menus reducer:', state, action)
    switch(action.type) {
        case t.FETCH_SUCCESS:
            return menuDataToLookup(action.data, {})
        default:
            return state
    }
}

// Build a lookup table from menu data
function menuDataToLookup(rawData: object[], result: MenuData): MenuData {
    for(const rawMenuEntry of rawData) {
        const id = get(rawMenuEntry, 'ID')
        result[id] = {
            title: get(rawMenuEntry, 'title'),
            order: get(rawMenuEntry, 'order'),
            page: get(rawMenuEntry, 'object_id'),
            children: [],
        }
        const children = get(rawMenuEntry, 'children')
        if(children) {
            result[id].children = menuItemsToOrderedIDs(children)
            menuDataToLookup(children, result)
        }
    }
    return result
}

// Create an ordered array with menu item IDs
function menuItemsToOrderedIDs(menuItems: object[]) {
    return menuItems
        .sort((a: object, b: object) => (get(a, 'order') > get(b, 'order') ? 1 : -1))
        .map((rawMenuEntry) => get(rawMenuEntry, 'ID'))
}

// Reduce the top-level menu items to an array
function menuItems(state: MenuItems = [], action: t.MenusAction): MenuItems {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            return menuItemsToOrderedIDs(action.data)
        default:
            return state
    }
}

// Fetching state reducer
function isFetching(state: boolean = false, action: t.MenusAction) {
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

export const remoteMenu = combineReducers({byId: menuData, items: menuItems, isFetching})

export default function menus(state: Menus = {}, action: t.MenusAction) {
    switch(action.type) {
        case t.FETCH:
        case t.FETCH_FAILURE:
        case t.FETCH_SUCCESS:
            return {
                ...state,
                [action.name]: remoteMenu(state[action.name], action),
            }
        default:
            return state
    }
}
