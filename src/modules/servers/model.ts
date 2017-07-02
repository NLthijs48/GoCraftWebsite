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
}

export type ServersData = ServerData[]

export interface ServersState extends RemoteState {
    data: ServersData
}
