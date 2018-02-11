import {Player} from 'modules/players/components/Player'
import {PlayerInfo} from 'modules/players/model'
import * as React from 'react'
import {Icon} from 'utils/Icon'

interface PlayersRowProps {
    players: PlayerInfo[]
}
export function PlayersRow({players}: PlayersRowProps) {
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
        }}>
            {players.length > 0 &&
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '1em',
                    color: '#FFF',
                    width: 'auto',
                    fontSize: '170%',
                    marginRight: '0.4em',
                    lineHeight: 1,
                    filter: 'drop-shadow(1px 1px 0 rgba(10,10,10,0.5))',
                }}>
                    <Icon name="user" style={{marginRight: '0.4em'}}/>
                    {players.length}
                </div>
            }

            <div style={{
                flex: 1,
                overflow: 'auto',
                display: 'flex',
                WebkitMaskImage: '-webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 2%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)',
                paddingLeft: '1em',
                paddingBottom: '2px', // Prevent cutting off shadows of <Players>s
            }}>
                {players.map((player) =>
                    <Player key={player.name} player={player} style={{marginRight: '2em', color: '#EEE', fontWeight: 'bold'}} />)
                }
                <div style={{minWidth: '1em'}}/>
            </div>
        </div>
    )
}
