import {combineReducers} from 'redux'
import {get} from 'utils/utils'
import * as t from './actionTypes'
import {ArkPlayer, ArkPlayers, MinecraftPlayers} from './model'

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
            // Filter players without name that are there for longer than 20 minutes (connecting bug?)
            // Currently only one server, called 'default'
            return {
                default: (get(action.data, 'players')||[]).map((player: object) => ({
                    game: 'ark',
                    name: get(player, 'Name'),
                    time: get(player, 'Time'),
                })).filter((player: ArkPlayer) => player.name || player.time<60*20),
            }
        default:
            return state
    }
}

export const players = combineReducers<MinecraftPlayers>({minecraft, ark})
