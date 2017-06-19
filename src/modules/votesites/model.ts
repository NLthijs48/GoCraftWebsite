import {RemoteState} from 'types'

// Information about a vote site
export interface VoteSite {
    name: string
    vote_url: string
    identifier: string
}

// ID -> VoteSite
export interface VoteSites {
    [k: string]: VoteSite
}

export type VoteSiteIds = string[]

export interface VoteSitesState extends RemoteState {
    byId: VoteSites
    items: VoteSiteIds
}
