import {OtherAction} from 'types'

// Start getting news items information
export const FETCH = 'newsItems/FETCH'
interface Fetch {
    type: 'newsItems/FETCH',
}

// Got news items information
export const FETCH_SUCCESS = 'newsItems/FETCH_SUCCESS'
interface FetchSuccess {
    type: 'newsItems/FETCH_SUCCESS',
    data: object[],
}

// Failed to get server information
export const FETCH_FAILURE = 'newsItems/FETCH_FAILURE'
interface FetchFailure {
    type: 'newsItems/FETCH_FAILURE',
}

// All server actions
export type NewsItemsAction =
    Fetch |
    FetchSuccess |
    FetchFailure |
    OtherAction
