export type PlayerInfo = MinecraftPlayer | ArkPlayer

// Minecraft
export interface MinecraftPlayer {
    game: 'minecraft'
    name: string
    uuid: string
}
export interface MinecraftPlayers {
    // Bungee server id -> players
    [k: string]: MinecraftPlayer[]
}

// ARK
export interface ArkPlayer {
    game: 'ark'
    name: string
    time: number
}
export interface ArkPlayers {
    // Server id -> players
    [k: string]: ArkPlayer[]
}

export interface PlayersState {
    minecraft: MinecraftPlayers
    ark: ArkPlayers
}
