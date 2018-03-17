import {RemoteState} from 'types'
import {ImageInfo} from 'utils/Image'

// Information about a server
export interface ServerData {
    id: string
    slug: string
    name: string
    shortDescription: string
    longDescription: string
    image: ImageInfo
    heroImage?: ImageInfo
    dynmapLink?: string
    dynmapPreview?: ImageInfo
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
    [k: string]: ServerData
}

export type ServerItems = string[]
export interface ServersBySlug {
    [k: string]: string
}

export interface ServersState extends RemoteState {
    byId: ServersData
    bySlug: ServersBySlug
    list: ServerItems
}
