import {RemoteState} from 'types'

// Information about a server
export interface ServerData {
    slug: string
    name: string
    shortDescription: string
    longDescription: string
    image: string
    dynmapLink?: string
    order: number
    bungeeID: string
    gameType: 'minecraft'|'ark'
}

export type ServersData = ServerData[]

export interface ServersState extends RemoteState {
    data: ServersData
}
