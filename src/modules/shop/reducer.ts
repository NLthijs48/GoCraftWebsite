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
            for(const rawShopCategory of action.shopLayout.categories) {
                const id = get(rawShopCategory, 'id')
                shopCategories[id] = {
                    name: get(rawShopCategory, 'name'),
                    iconBlockId: get(rawShopCategory, 'iconid'),
                    items: [],
                }
            }

            // Add pages to the children array of their parent
            for(const rawItem of action.shopLayout.result) {
                const category = get(rawItem, 'categoryid')
                shopCategories[category].items.push(get(rawItem, 'id'))
            }
            return shopCategories
        default:
            return state
    }
}

function itemsById(state: ShopItems = {}, action: t.ShopLayoutAction): ShopItems {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Get the properties we need from the WordPress byId
            const shopItems: ShopItems = {...state}
            for(const rawShopItem of action.shopLayout.result) {
                const id = get(rawShopItem, 'id')
                shopItems[id] = {
                    name: get(rawShopItem, 'name'),
                    buyUrl: get(rawShopItem, 'url'),
                    price: +get(rawShopItem, 'price'),
                    currency: get(rawShopItem, 'currency'),
                    requiredItems: get(rawShopItem, 'required'),
                    iconBlockId: get(rawShopItem, 'iconid'),
                    description: get(rawShopItem, 'description'),
                    ...shopItems[id],
                }
            }

            return shopItems
        case t.FETCH_INFO_SUCCESS:
            const shopItemsInfo: ShopItems = {...state}
            for(const rawShopInfo of action.data) {
                const id = get(rawShopInfo, 'acf', 'minecraftmarket_shop_item_number')
                shopItemsInfo[id] = {
                    image: parseImage(800, get(rawShopInfo, 'acf', 'image', 'sizes')),
                    perks: perksReducer(get(rawShopInfo, 'acf', 'perks')),
                    ...shopItemsInfo[id],
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
            return action.shopLayout.categories
                .sort((a, b) => get(a, 'order') - get(b, 'order'))
                .map((rawShopCategory) => get(rawShopCategory, 'id'))
        default:
            return state
    }
}

export const shopLayout = combineReducers<ShopLayoutState>({categoriesById, itemsById, rootCategories})
