import {Player} from 'modules/players/components/Player'
import {PlayerInfo} from 'modules/players/model'
import * as React from 'react'

interface PlayersListProps {
    players: PlayerInfo[]
}
export function PlayersList({players}: PlayersListProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '-0.5em', // Compensate for margin of last player
        }}>
            <h2>Online players</h2>
            {players.map((player) =>
                <Player player={player} style={{marginBottom: '0.5em'}} />)
            }
        </div>
    )
}
