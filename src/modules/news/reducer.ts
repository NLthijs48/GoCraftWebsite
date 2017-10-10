import {parseImage} from 'reducer'
import {combineReducers} from 'redux'
import {get} from 'utils/utils'
import * as t from './actionTypes'
import {NewsItemIds, NewsItems, NewsItemsState} from './model'

// Server data reducer
function byId(state: NewsItems = {}, action: t.NewsItemsAction): NewsItems {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Get the properties we need from the WordPress byId
            const newsItems: NewsItems = {...state}
            for(const rawNewsItem of action.data) {
                newsItems[get(rawNewsItem, 'id')] = {
                    title: get(rawNewsItem, 'title', 'rendered'),
                    slug: get(rawNewsItem, 'slug'),
                    date: Date.parse(get(rawNewsItem, 'date')),
                    image: parseImage(800, get(rawNewsItem, 'acf', 'feature_image', 'sizes')),
                    content: get(rawNewsItem, 'content', 'rendered'),
                    author: {
                        id: get(rawNewsItem, 'author'),
                        name: get(rawNewsItem, '_embedded', 'author', 0, 'name'),
                        avatar: get(rawNewsItem, '_embedded', 'author', 0, 'avatar_urls', '96'),
                    },
                }
            }
            return newsItems
        default:
            return state
    }
}

// Build array of menu items
function items(state: NewsItemIds = [], action: t.NewsItemsAction): NewsItemIds {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Order as given by WordPress is sorted correctly, newest first
            return action.data.map((rawNewsItem) => get(rawNewsItem, 'id'))
        default:
            return state
    }
}

// Fetching state reducer
function isFetching(state: boolean = false, action: t.NewsItemsAction): boolean {
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

export const newsItems = combineReducers<NewsItemsState>({byId, items, isFetching})
