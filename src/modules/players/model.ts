// Information about a news item
export interface PlayerInfo {
    name: string
    uuid: string
}

export interface PlayersState {
    // Map server name to a list of players
    [k: string]: PlayerInfo[]
}
