import {Loading} from 'modules/pages/components/Loading'
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
            filter: 'drop-shadow(1px 1px 0 rgba(10,10,10,0.5))',
            ...style,
        }}>
            <div style={{
                backgroundImage: player.name ? 'url("https://mc-heads.net/head/' + encodeURIComponent(player.name) + '/64"), url("https://mc-heads.net/head/Steve/64")' : '',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: '50% 50%',
                height: 45,
                width: 42,
                flexShrink: 0,
                position: 'relative',
            }}>
                {!player.name && <Loading size={35} />}
            </div>

            <div className="ellipsis" style={{
                flex: 1,
                marginLeft: '0.5em',
                color: player.name ? '' : '#888',
            }}>
                {player.name||'Connecting...'}
            </div>
        </div>
    )
}
