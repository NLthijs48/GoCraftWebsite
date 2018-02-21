import {RemoteState, UnixDate, User} from 'types'

// Information about a news item
export interface NewsItem {
    title: string
    slug: string
    date: UnixDate
    blocks: Block[]
    image: string
    author: User
}

// Blocks
export interface ImageBlock {
    type: 'image_block'
    image: string
}
export interface TextBlock {
    type: 'text_block'
    text: string
}
export type Block =
    ImageBlock |
    TextBlock

// ID -> NewsItem
export interface NewsItems {
    [k: string]: NewsItem
}

export type NewsItemIds = string[]

export interface NewsItemsState extends RemoteState {
    byId: NewsItems
    items: NewsItemIds
}
