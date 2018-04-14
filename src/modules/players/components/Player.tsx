import {Loading} from 'modules/pages/components/Loading'
import {PlayerInfo} from 'modules/players/model'
import * as React from 'react'

interface PlayerProps {
    player: Partial<PlayerInfo>
    style?: React.CSSProperties
    placeholder?: string
}

export function Player({player, style, placeholder}: PlayerProps) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            ...style,
        }}>
            <div style={{
                backgroundImage: player.name ? 'url("https://mc-heads.net/head/' + encodeURIComponent(player.name) + '/64"), url("https://mc-heads.net/head/Steve/64")' : '',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: '50% 50%',
                height: '2.5em',
                width: '2.4em',
                flexShrink: 0,
                position: 'relative',
            }}>
                {!player.name && <Loading size={35} />}
            </div>

            <div className="ellipsis" style={{
                flex: 1,
                marginLeft: '0.5em',
                color: player.name ? '' : '#888',
                fontWeight: 'bold',
            }}>
                {player.name||placeholder||'Connecting...'}
            </div>
        </div>
    )
}
