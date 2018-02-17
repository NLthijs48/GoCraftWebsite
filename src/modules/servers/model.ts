import {RemoteState} from 'types'

// Information about a server
export interface ServerData {
    slug: string
    name: string
    shortDescription: string
    longDescription: string
    image: string
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
    image: string
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

export interface ServersState extends RemoteState {
    byId: ServersData
    list: ServerItems
}
