import * as t from './actionTypes'
import {PlayersState} from './model'

// Server data reducer
export function players(state: PlayersState = {}, action: t.PlayersAction): PlayersState {
    switch(action.type) {
        case t.UPDATE:
            return action.to
        default:
            return state
    }
}
