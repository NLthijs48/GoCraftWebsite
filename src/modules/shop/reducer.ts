import {Perk, ShopCategories, ShopCategoryItems, ShopItems, ShopLayoutState} from 'modules/shop/model'
import {parseImage} from 'reducer'
import {combineReducers} from 'redux'
import {get} from 'utils/utils'
import * as t from './actionTypes'

function categoriesById(state: ShopCategories = {}, action: t.ShopLayoutAction): ShopCategories {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Get the shop category details
            const shopCategories: ShopCategories = {...state}
            for(const rawShopCategory of action.categories.results) {
                const id = get(rawShopCategory, 'id')
                shopCategories[id] = {
                    name: get(rawShopCategory, 'name'),
                    description: get(rawShopCategory, 'gui_description'),
                    iconBlockId: get(rawShopCategory, 'gui_icon'),
                    items: (get(rawShopCategory, 'items') as object[])
                        .sort((a, b) => (+get(a, 'order')) - (+get(b, 'order')))
                        .map((categoryItem) => get(categoryItem, 'id')),
                }
            }
            return shopCategories
        default:
            return state
    }
}

function itemsById(state: ShopItems = {}, action: t.ShopLayoutAction): ShopItems {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Info from MinecraftMarket
            const shopItems: ShopItems = {...state}
            for(const rawShopItem of action.items.results) {
                const id = get(rawShopItem, 'id')
                shopItems[id] = {
                    ...shopItems[id],
                    name: get(rawShopItem, 'name'),
                    buyUrl: get(rawShopItem, 'gui_url'),
                    price: +get(rawShopItem, 'price'),
                    iconBlockId: get(rawShopItem, 'gui_icon'),
                    description: get(rawShopItem, 'gui_description'),
                }
            }

            return shopItems
        case t.FETCH_INFO_SUCCESS:
            // Info from WordPress
            const shopItemsInfo: ShopItems = {...state}
            for(const rawShopInfo of action.data) {
                const id = get(rawShopInfo, 'acf', 'minecraftmarket_shop_item_number')
                shopItemsInfo[id] = {
                    ...shopItemsInfo[id],
                    image: parseImage(800, get(rawShopInfo, 'acf', 'image', 'sizes')),
                    perks: perksReducer(get(rawShopInfo, 'acf', 'perks')),
                }
            }
            return shopItemsInfo
        default:
            return state
    }
}

function perksReducer(rawPerks: any): Perk[] {
    if(!rawPerks) {
        return []
    }

    return rawPerks.map((rawPerk: object) => ({
        text: get(rawPerk, 'perk'),
        servers: (get(rawPerk, 'servers')||[]).map((rawServer: object) => get(rawServer, 'post_title')),
        sub: get(rawPerk, 'subperk'),
    }))
}

// Build array of menu items
function rootCategories(state: ShopCategoryItems = [], action: t.ShopLayoutAction): ShopCategoryItems {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            return action.categories.results
                .sort((a, b) => (+get(a, 'order')) - (+get(b, 'order')))
                .map((rawShopCategory) => get(rawShopCategory, 'id'))
        default:
            return state
    }
}

export const shopLayout = combineReducers<ShopLayoutState>({categoriesById, itemsById, rootCategories})
