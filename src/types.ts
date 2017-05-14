export interface OtherAction {
    type: '',
}

// State with properties to indicate status of remote data
// Extend this state with own properties
export interface RemoteState {
    isFetching: boolean
}
