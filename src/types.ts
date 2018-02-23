import createMuiTheme from 'material-ui/styles/createMuiTheme'

export interface OtherAction {
    type: '',
}

// ServersState with properties to indicate status of remote data
// Extend this state with own properties
export interface RemoteState {
    isFetching: boolean
}

export const PERSIST_REHYDRATE = 'persist/REHYDRATE'
export interface PersistRehydrate {
    type: 'persist/REHYDRATE'
}

// WordPress user
export interface User {
    id: number
    name: string
    // URL of the avatar
    avatar: string
}

export const THEME = createMuiTheme({
    palette: {
        primary: {
            light: '#6abf69',
            main: '#388e3c',
            dark: '#00600f',
            contrastText: '#FFF',
        },
    },
})

export type UnixDate = number
