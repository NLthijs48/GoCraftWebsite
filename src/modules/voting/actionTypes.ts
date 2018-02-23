import {VoteRanking, VoteStatus} from 'modules/voting/model'
import {OtherAction, PersistRehydrate} from 'types'

// Start getting vote site information
export const FETCH = 'voting/FETCH'
interface Fetch {
    type: 'voting/FETCH',
}

// Got vote sites information
export const FETCH_SUCCESS = 'voting/FETCH_SUCCESS'
interface FetchSuccess {
    type: 'voting/FETCH_SUCCESS',
    data: object[],
}

// Failed to get vote sites information
export const FETCH_FAILURE = 'voting/FETCH_FAILURE'
interface FetchFailure {
    type: 'voting/FETCH_FAILURE',
}

export const STATUS_UPDATE = 'voting/STATUS_UPDATE'
interface StatusUpdate {
    type: 'voting/STATUS_UPDATE'
    status: VoteStatus
}

export const SELECT_SITE = 'voting/SELECT_SITE'
interface SelectSite {
    type: 'voting/SELECT_SITE'
    site: string
}

export const TOP_UPDATE = 'voting/TOP_UPDATE'
interface TopUpdate {
    type: 'voting/TOP_UPDATE'
    ranking: VoteRanking
}

// All server actions
export type VoteSitesAction =
    Fetch |
    FetchSuccess |
    FetchFailure |
    StatusUpdate |
    SelectSite |
    TopUpdate |
    PersistRehydrate |
    OtherAction
