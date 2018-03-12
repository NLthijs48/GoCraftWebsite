import {DrawerState} from 'modules/drawer/model'
import {drawer} from 'modules/drawer/reducer'
import {NewsItemsState} from 'modules/news/model'
import {newsItems} from 'modules/news/reducer'
import {OptionsState} from 'modules/options/model'
import {options} from 'modules/options/reducer'
import {PagesState} from 'modules/pages/model'
import {pages} from 'modules/pages/reducer'
import {PlayersState} from 'modules/players/model'
import {players} from 'modules/players/reducer'
import {ServersState} from 'modules/servers/model'
import {servers} from 'modules/servers/reducer'
import {ShopLayoutState} from 'modules/shop/model'
import {shopLayout} from 'modules/shop/reducer'
import {VotingState} from 'modules/voting/model'
import {voting} from 'modules/voting/reducer'
import {ImageInfo} from 'utils/Image'

export interface AppState {
    servers: ServersState
    pages: PagesState
    drawer: DrawerState
    newsItems: NewsItemsState
    voting: VotingState
    options: OptionsState
    players: PlayersState
    shopLayout: ShopLayoutState
    reducerVersion: number
}

const reducerVersion = (state: number = 0, action: { type: string }) => {
    switch(action.type) {
        case 'REDUCER_UPDATED':
            return state + 1
        default:
            return state
    }
}

export const parseImage = (target: number, data: {sizes: {[key: string]: string|{source_url: string}}}): string => {
    if(!data || !data.sizes) {
        return ''
    }
    const sizes = data.sizes

    let pickSize = 50
    while(pickSize < target) {
        pickSize *= 2
    }

    const pickedImage = sizes['x'+pickSize] || sizes.full
    if(!pickedImage) {
        return ''
    } else if(typeof pickedImage === 'string') {
        return pickedImage
    } else {
        return pickedImage.source_url
    }
}

export const parseImageInfo = (data: {sizes: {[key: string]: string}}): ImageInfo => {
    const result: ImageInfo = {options: []}

    if(!data || !data.sizes) {
        return result
    }

    // Build options
    for(const k in data.sizes) {
        // Only look at x<number> that does not have the width/height
        if(k[0] !== 'x' || k.indexOf('-width') > 0 || k.indexOf('-height') > 0) {
            continue
        }

        // Don't add same url again
        if(result.options.filter((option) => option.url === data.sizes[k]).length > 0) {
            continue
        }

        // Add option (TODO: native Wordpress case)
        result.options.push({
            url: data.sizes[k],
            width: +data.sizes[k + '-width'],
            height: +data.sizes[k + '-height'],
        })
    }

    // Descending sort
    result.options.sort((a, b) => b.width - a.width)

    return result
}

export const reducers = {
    servers,
    pages,
    drawer,
    newsItems,
    voting,
    options,
    players,
    shopLayout,
    reducerVersion,
}
