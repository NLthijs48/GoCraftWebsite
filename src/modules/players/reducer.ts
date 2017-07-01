import * as t from './actionTypes'
import {PlayersState} from './model'

// Server data reducer
export const players = (state: PlayersState = {}, action: t.PlayersAction) => {
    switch(action.type) {
        case t.UPDATE:
            return action.to
        default:
            return state
    }
}
