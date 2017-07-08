import {PlayerInfo} from 'modules/players/model'
import * as React from 'react'

interface PlayerProps {
    player: PlayerInfo
    style?: React.CSSProperties
}
export function Player({player, style}: PlayerProps) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            ...style,
        }}>
            <div style={{
                backgroundImage: 'url(https://crafatar.com/renders/head/'+player.name+'?overlay&size=60',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.5))',
                height: 40,
                width: 35,
                flexShrink: 0,
            }} />

            <div className="ellipsis" style={{
                flex: 1,
                marginLeft: '1em',
            }}>
                {player.name}
            </div>
        </div>
    )
}
