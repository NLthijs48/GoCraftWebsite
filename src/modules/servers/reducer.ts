import {parseImage} from 'reducer'
import {combineReducers} from 'redux'
import {get} from 'utils/utils'
import * as t from './actionTypes'
import {Feature, ServersData, ServersState} from './model'

// Server data reducer
function data(state: ServersData = [], action: t.ServersAction): ServersData {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Get the properties we need from the WordPress data
            const servers = []
            for(const rawServer of action.data) {
                const slug = get(rawServer, 'slug')
                if(typeof slug !== 'string') {
                    console.error('Server has no slug:', rawServer)
                    continue
                }
                servers.push({
                    slug,
                    name: get(rawServer, 'title', 'rendered'),
                    shortDescription: get(rawServer, 'acf', 'description'),
                    longDescription: get(rawServer, 'acf', 'details'),
                    image: parseImage(800, get(rawServer, 'acf', 'feature_image', 'sizes')),
                    heroImage: get(rawServer, 'acf', 'hero_image', 'url'),
                    dynmapLink: get(rawServer, 'acf', 'dynmap', 'link'),
                    dynmapPreview: parseImage(800, get(rawServer, 'acf', 'dynmap', 'preview', 'sizes')),
                    order: get(rawServer, 'menu_order'),
                    bungeeID: get(rawServer, 'acf', 'bungee_id'),
                    gameType: get(rawServer, 'acf', 'game_type', 'value'),
                    features: features(get(rawServer, 'acf', 'content')),
                })
            }
            servers.sort((a, b) => a.order-b.order)
            return servers
        default:
            return state
    }
}

function features(rawFeatures: any): Feature[] {
    if(!rawFeatures) {
        return []
    }

    return rawFeatures.map(({acf_fc_layout: type, ...details}: {acf_fc_layout: string, [key: string]: any}) => {
        if(!type || !details) {
            return undefined
        }
        switch(type) {
            case 'simple_feature':
                return {
                    type,
                    title: details.title,
                    description: details.description,
                    image: parseImage(1600, get(details.image, 'sizes')),
                }
            case 'slider_feature':
                return {
                    type,
                    header: details.header,
                    slides: (details.feature_list||[]).map((slide: any) => ({
                        title: get(slide, 'title'),
                        image: parseImage(1600, get(slide, 'image', 'sizes')),
                    })),
                }
            default:
                console.error('unknown server feature type:', type, 'details:', details)
                return undefined
        }
    })
}

// Fetching state reducer
function isFetching(state: boolean = false, action: t.ServersAction): boolean {
    switch(action.type) {
        case t.FETCH:
            return true
        case t.FETCH_SUCCESS:
        case t.FETCH_FAILURE:
            return false
        default:
            return state
    }
}

export const servers = combineReducers<ServersState>({data, isFetching})
