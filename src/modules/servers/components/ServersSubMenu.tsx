import ListItem from 'material-ui/List/ListItem'
import {LeftIconImage} from 'modules/pages/components/LeftIconImage'
import {PlayersState} from 'modules/players/model'
import {getServerTypeIcon} from 'modules/servers/components/Servers'
import * as React from 'react'
import {NavLink} from 'react-router-dom'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {nameToPath} from 'utils/utils'
import {ServersState} from '../model'

interface ServersListItemProps {
    servers: ServersState
    players: PlayersState
    basePath: string
}
export function serverListItems({servers, basePath, players}: ServersListItemProps) {
    return servers.data.map((server) => {
        const path = basePath + nameToPath(server.slug)
        const playerCount = ({
            minecraft: players.minecraft[server.bungeeID || ''],
            ark: players.ark.default,
        }[server.gameType] || []).length
        return (
            <ListItem
                key={path}
                primaryText={server.name}
                containerElement={
                    <NavLink
                        to={path}
                        activeStyle={{color: '#000', display: 'block'}}
                    />
                }
                style={{color: '#666'}}
                leftIcon={<LeftIconImage image={getServerTypeIcon(server)}/>}
                rightIcon={playerCount > 0 ?
                    <div style={{
                        backgroundColor: '#BBB',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '1em',
                        color: 'white',
                        fontSize: '80%',
                        width: '3em',
                        padding: '0 0.5em',
                    }}>
                        <Icon name="user" size={12}/>
                        <Filler />
                        {playerCount}
                    </div>
                    : undefined
                }
            />
        )
    })
}
