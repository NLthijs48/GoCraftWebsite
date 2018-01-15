import {RemoteState} from 'types'

// Information about a vote site
export interface VoteSite {
    name: string
    vote_url: string
    identifiers: string[]
    cooldown: number
    lastVoted?: number
    canVote?: boolean
}

// ID -> VoteSite
export interface VoteSites {
    [k: string]: VoteSite
}

export type VoteSiteIds = string[]

export interface VoteStatus {
    [k: string]: VoteIdentifierStatus
}
export interface VoteIdentifierStatus {
    lastVoted: number
}

export interface VoteSitesState extends RemoteState {
    byId: VoteSites
    items: VoteSiteIds
    voteStatus: VoteStatus
}
