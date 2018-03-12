import {RemoteState} from 'types'
import {ImageInfo} from 'utils/Image'

// Information about a server
export interface ServerData {
    slug: string
    name: string
    shortDescription: string
    longDescription: string
    image: ImageInfo
    heroImage?: string
    dynmapLink?: string
    dynmapPreview?: string
    order: number
    gameType: 'minecraft'|'ark'
    bungeeID?: string
    features: Feature[]
}

// Features
export interface SimpleFeature {
    type: 'simple_feature'
    title: string
    description?: string
    image: ImageInfo
}
export interface SliderFeature {
    type: 'slider_feature'
    header: string
    slides: SimpleFeature[]
}
export type Feature =
    SimpleFeature |
    SliderFeature

export interface ServersData {
    [k: number]: ServerData
}

export type ServerItems = number[]
export interface ServersBySlug {
    [k: string]: number
}

export interface ServersState extends RemoteState {
    byId: ServersData
    list: ServerItems
    bySlug: ServersBySlug
}
