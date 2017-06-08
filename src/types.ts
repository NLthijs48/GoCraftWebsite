import {MuiTheme} from 'material-ui/styles'
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

export interface ThemeProps {
    muiTheme?: MuiTheme
}

export const goCraftTheme = {
    palette: {
        primary1Color: '#388e3c',
        primary2Color: '#66bb6a',
        accent1Color: '#fb8c00',
        accent3Color: '#ff9800',
        primary3Color: '#e0e0e0',
        textColor: 'rgba(0, 0, 0, 0.9)',
        secondaryTextColor: 'rgba(0, 0, 0, 0.59)',
        borderColor: '#bdbdbd',
        pickerHeaderColor: '#388e3c',
        clockCircleColor: 'rgba(0, 0, 0, 0.05)',
    }
    ,
    appBar: {
        height: 50,
    },
}
