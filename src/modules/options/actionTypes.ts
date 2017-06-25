import {OtherAction} from 'types'

// Got options information
export const FETCH_SUCCESS = 'options/FETCH_SUCCESS'
interface FetchSuccess {
    type: 'options/FETCH_SUCCESS',
    data: object[],
}

// Failed to get options
export const FETCH_FAILURE = 'options/FETCH_FAILURE'
interface FetchFailure {
    type: 'options/FETCH_FAILURE',
}

// All options actions
export type OptionsActions =
    FetchSuccess |
    FetchFailure |
    OtherAction
