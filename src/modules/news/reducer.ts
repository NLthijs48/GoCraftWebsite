import {MenuItems} from 'modules/routing/model'
import {combineReducers} from 'redux'
import {get} from 'utils/utils'
import * as t from './actionTypes'
import {NewsItemIds, NewsItems} from './model'

// Server data reducer
const byId = (state: NewsItems = {}, action: t.NewsItemsAction) => {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Get the properties we need from the WordPress byId
            const newsItems: NewsItems = {...state}
            for(const rawNewsItem of action.data) {
                newsItems[get(rawNewsItem, 'id')] = {
                    title: get(rawNewsItem, 'title', 'rendered'),
                    slug: get(rawNewsItem, 'slug'),
                    image: get(rawNewsItem, 'acf', 'feature_image', 'sizes', 'medium'),
                    content: get(rawNewsItem, 'content', 'rendered'),
                }
            }
            return newsItems
        default:
            return state
    }
}

// Build array of menu items
function items(state: NewsItemIds = [], action: t.NewsItemsAction): MenuItems {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Order as given by WordPress is sorted correctly, newest first
            return action.data.map((rawNewsItem) => get(rawNewsItem, 'id'))
        default:
            return state
    }
}

// Fetching state reducer
const isFetching = (state: boolean = false, action: t.NewsItemsAction) => {
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

export const newsItems = combineReducers({byId, items, isFetching})
