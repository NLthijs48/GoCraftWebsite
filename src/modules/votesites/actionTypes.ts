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

// All server actions
export type VoteSitesAction =
    Fetch |
    FetchSuccess |
    FetchFailure |
    OtherAction