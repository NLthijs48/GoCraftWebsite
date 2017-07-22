import {Loading} from 'modules/pages/components/Loading'
import {PlayerInfo} from 'modules/players/model'
import * as React from 'react'

interface PlayerProps {
    player: PlayerInfo
    style?: React.CSSProperties
}

// TODO ark specific rendering
export function Player({player, style}: PlayerProps) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            ...style,
        }}>
            <div style={{
                backgroundImage: player.name ? 'url("https://crafatar.com/renders/head/' + encodeURIComponent(player.name) + '?overlay&size=60"), url(https://crafatar.com/renders/head/29099234092324?overlay&size=60&default)' : '',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.5))',
                height: 40,
                width: 35,
                flexShrink: 0,
                position: 'relative',
            }}>
                {!player.name && <Loading size={35} />}
            </div>

            <div className="ellipsis" style={{
                flex: 1,
                marginLeft: '1em',
                color: player.name ? '' : '#888',
            }}>
                {player.name||'Connecting...'}
            </div>
        </div>
    )
}
