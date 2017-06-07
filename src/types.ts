export interface OtherAction {
    type: '',
}

// ServersState with properties to indicate status of remote data
// Extend this state with own properties
export interface RemoteState {
    isFetching: boolean
}

// WordPress user
export interface User {
    id: number
    name: string
    // URL of the avatar
    avatar: string
}
