import {PlayersState} from 'modules/players/model'
import * as t from './actionTypes'

export function updateOnlinePlayers(to: PlayersState) {
    return {
        type: t.UPDATE,
        to,
    }
}
