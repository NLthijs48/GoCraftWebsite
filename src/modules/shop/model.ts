export interface ShopItem {
    name: string
    buyUrl: string
    price: number
    iconBlockId: string
    description: string
    image: string
    perks: Perk[]
}

export interface Perk {
    text: string
    servers: string[]
    sub: boolean
}

export interface ShopItems {
    [key: number]: ShopItem
}

export interface ShopCategory {
    name: string
    description: string
    iconBlockId: string
    items: number[]
}

export type ShopCategoryItems = number[]

export interface ShopCategories {
    [key: number]: ShopCategory
}

export interface ShopLayoutState {
    rootCategories: ShopCategoryItems
    categoriesById: ShopCategories
    itemsById: ShopItems
}
