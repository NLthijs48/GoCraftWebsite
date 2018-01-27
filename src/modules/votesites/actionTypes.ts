import {VoteStatus} from 'modules/votesites/model'
import {OtherAction} from 'types'

// Start getting vote site information
export const FETCH = 'voteSites/FETCH'
interface Fetch {
    type: 'voteSites/FETCH',
}

// Got vote sites information
export const FETCH_SUCCESS = 'voteSites/FETCH_SUCCESS'
interface FetchSuccess {
    type: 'voteSites/FETCH_SUCCESS',
    data: object[],
}

// Failed to get vote sites information
export const FETCH_FAILURE = 'voteSites/FETCH_FAILURE'
interface FetchFailure {
    type: 'voteSites/FETCH_FAILURE',
}

export const STATUS_UPDATE = 'voteSites/STATUS_UPDATE'
interface StatusUpdate {
    type: 'voteSites/STATUS_UPDATE'
    status: VoteStatus
}

export const SELECT_SITE = 'voteSites/SELECT_SITE'
interface SelectSite {
    type: 'voteSites/SELECT_SITE'
    site: string
}

// All server actions
export type VoteSitesAction =
    Fetch |
    FetchSuccess |
    FetchFailure |
    StatusUpdate |
    SelectSite |
    OtherAction
