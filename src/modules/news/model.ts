import {RemoteState, UnixDate, User} from 'types'
import {ImageInfo} from 'utils/Image'

// Information about a news item
export interface NewsItem {
    title: string
    slug: string
    date: UnixDate
    blocks: Block[]
    image: ImageInfo
    author: User
}

// Blocks
export interface ImageBlock {
    type: 'image_block'
    image: ImageInfo
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
export interface NewsItemsBySlug {
    [k: string]: number
}

export interface NewsItemsState extends RemoteState {
    byId: NewsItems
    bySlug: NewsItemsBySlug
    items: NewsItemIds
}
