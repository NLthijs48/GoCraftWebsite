import {PlayersState} from 'modules/players/model'
import {OtherAction} from 'types'

// Start getting news items information
export const UPDATE = 'players/UPDATE'
interface Update {
    type: 'players/UPDATE',
    players: PlayersState,
}

// All server actions
export type PlayersAction =
    Update |
    OtherAction
