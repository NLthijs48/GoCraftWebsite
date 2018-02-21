import {parseImage} from 'reducer'
import {combineReducers} from 'redux'
import {get} from 'utils/utils'
import * as t from './actionTypes'
import {Block, NewsItemIds, NewsItems, NewsItemsState} from './model'

// Server data reducer
function byId(state: NewsItems = {}, action: t.NewsItemsAction): NewsItems {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Get the properties we need from the WordPress byId
            const result: NewsItems = {...state}
            for(const rawNewsItem of action.data) {
                result[get(rawNewsItem, 'id')] = {
                    title: get(rawNewsItem, 'title', 'rendered'),
                    slug: get(rawNewsItem, 'slug'),
                    date: Date.parse(get(rawNewsItem, 'date')),
                    image: parseImage(800, get(rawNewsItem, 'acf', 'feature_image', 'sizes')),
                    content: blocks(get(rawNewsItem, 'acf', 'content')),
                    author: {
                        id: get(rawNewsItem, 'author'),
                        name: get(rawNewsItem, '_embedded', 'author', 0, 'name'),
                        avatar: get(rawNewsItem, '_embedded', 'author', 0, 'avatar_urls', '96'),
                    },
                }
            }
            return result
        default:
            return state
    }
}

// Parse news item blocks
function blocks(rawBlocks: any): Block[] {
    if(!rawBlocks) {
        return []
    }

    return rawBlocks.map(({acf_fc_layout: type, ...details}: {acf_fc_layout: string, [key: string]: any}) => {
        if(!type || !details) {
            return undefined
        }
        switch(type) {
            case 'text_block':
                return {
                    type,
                    text: details.text,
                }
            case 'image_block':
                return {
                    type,
                    image: parseImage(1600, get(details, 'image', 'sizes')),
                }
            default:
                console.error('unknown new item block type:', type, 'details:', details)
                return undefined
        }
    })
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
