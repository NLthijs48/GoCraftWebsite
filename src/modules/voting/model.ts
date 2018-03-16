import {PlayerInfo} from 'modules/players/model'
import {RemoteState} from 'types'

// Information about a vote site
export interface VoteSite {
    id: string
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

// Vote ranking data
export interface VoteRankings {
    // Year-month -> VoteRanking, 2018-02
    [k: string]: VoteRanking
}
export interface VoteRanking {
    year: number
    month: number
    // rank -> VoteRankingEntry
    entries: VoteRankingEntry[]
    // TODO something about the range that is already loaded
}
export interface VoteRankingEntry {
    player: PlayerInfo
    rank: number
    votes: number
}

export interface VotingState extends RemoteState {
    byId: VoteSites
    items: VoteSiteIds
    voteStatus: VoteStatus
    selected: string
    rankings: VoteRankings
}
