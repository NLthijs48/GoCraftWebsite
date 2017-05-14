// Information about a server
import {RemoteState} from '../../types'
export interface ServerData {
    slug: string
    name: string
    shortDescription: string
    longDescription: string
    image: string
}

export type ServersData = ServerData[]

export interface State extends RemoteState {
    data: ServersData
}
