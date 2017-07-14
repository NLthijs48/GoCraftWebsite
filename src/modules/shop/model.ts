export interface ShopItem {
    name: string
    buyUrl: string
    price: number
    currency: string
    requiredItems: string[]
    iconBlockId: string
    description: string
}

export interface ShopItems {
    [key: number]: ShopItem
}

export interface ShopCategory {
    name: string
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