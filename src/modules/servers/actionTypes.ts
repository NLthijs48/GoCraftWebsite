import {OtherAction} from 'types'

// Start getting servers information
export const FETCH = 'servers/FETCH'
interface Fetch {
    type: 'servers/FETCH',
}

// Got servers information
export const FETCH_SUCCESS = 'servers/FETCH_SUCCESS'
interface FetchSuccess {
    type: 'servers/FETCH_SUCCESS',
    data: object[],
}

// Failed to get server information
export const FETCH_FAILURE = 'servers/FETCH_FAILURE'
interface FetchFailure {
    type: 'servers/FETCH_FAILURE',
}

// All server actions
export type ServersAction =
    Fetch |
    FetchSuccess |
    FetchFailure |
    OtherAction
