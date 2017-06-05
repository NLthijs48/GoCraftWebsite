import {RemoteState} from 'types'

// Information about a news item
export interface NewsItem {
    title: string
    slug: string
    content: string
    image: string
}

// ID -> NewsItem
export interface NewsItems {
    [k: string]: NewsItem
}

export type NewsItemIds = string[]

export interface NewsItemsState extends RemoteState {
    byId: NewsItems
    items: NewsItemIds
}
