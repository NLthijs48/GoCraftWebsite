import {MinecraftPlayers} from 'modules/players/model'

// Start getting news items information
export const UPDATE = 'players/UPDATE'
interface OnlinePlayers {
    type: 'OnlinePlayers',
    players: MinecraftPlayers
}

// All websocket messages
export type WebsocketMessage =
    OnlinePlayers
