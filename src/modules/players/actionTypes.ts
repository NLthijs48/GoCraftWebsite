import {MinecraftPlayers} from 'modules/players/model'
import {OtherAction} from 'types'

// Receive Minecraft players information
export const UPDATE = 'players/UPDATE'
interface Update {
    type: 'players/UPDATE',
    players: MinecraftPlayers,
}

// Start getting ark palyes
export const FETCH_ARK = 'players/FETCH_ARK'

interface FetchArk {
    type: 'players/FETCH_ARK',
}

// Receive Ark players info
export const FETCH_ARK_SUCCESS = 'players/FETCH_ARK_SUCCESS'

interface FetchArkSuccess {
    type: 'players/FETCH_ARK_SUCCESS',
    data: object[],
}

// Failed to get server information
export const FETCH_ARK_FAILURE = 'players/FETCH_ARK_FAILURE'

interface FetchArkFailure {
    type: 'players/FETCH_ARK_FAILURE',
}

// All server actions
export type PlayersAction =
    Update |
    FetchArk |
    FetchArkSuccess |
    FetchArkFailure |
    OtherAction
