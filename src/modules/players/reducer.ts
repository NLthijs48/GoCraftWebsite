import {combineReducers} from 'redux'
import {get} from 'utils/utils'
import * as t from './actionTypes'
import {ArkPlayers, MinecraftPlayers} from './model'

// Minecraft players
export function minecraft(state: MinecraftPlayers = {}, action: t.PlayersAction): MinecraftPlayers {
    switch(action.type) {
        case t.UPDATE:
            return action.players
        default:
            return state
    }
}

// ARK players
export function ark(state: ArkPlayers = {}, action: t.PlayersAction): ArkPlayers {
    switch(action.type) {
        case t.FETCH_ARK_SUCCESS:
            return {
                ...state,
                default: (get(action.data, 'players')||[]).map((player: object) => ({
                    game: 'ark',
                    name: get(player, 'Name'),
                    time: get(player, 'Time'),
                })),
            }
        default:
            return state
    }
}

export const players = combineReducers<MinecraftPlayers>({minecraft, ark})
