import {RemoteState, UnixDate, User} from 'types'

// Information about a news item
export interface NewsItem {
    title: string
    slug: string
    date: UnixDate
    content: string
    image: string
    author: User
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
