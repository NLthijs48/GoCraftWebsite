import {ImageInfo} from 'utils/Image'

export interface ShopItem {
    id: string
    name: string
    buyUrl: string
    price: number
    iconBlockId: string
    description: string
    image: ImageInfo
    perks: Perk[]
}

export interface Perk {
    text: string
    servers: string[]
    sub: boolean
}

export interface ShopItems {
    [key: string]: ShopItem
}

export interface ShopCategory {
    id: string
    name: string
    description: string
    iconBlockId: string
    items: string[]
}

export type ShopCategoryItems = string[]

export interface ShopCategories {
    [key: string]: ShopCategory
}

export interface ShopLayoutState {
    rootCategories: ShopCategoryItems
    categoriesById: ShopCategories
    itemsById: ShopItems
}
