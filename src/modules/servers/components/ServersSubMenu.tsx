import ListItem from 'material-ui/List/ListItem'
import {PlayersState} from 'modules/players/model'
import * as React from 'react'
import {NavLink} from 'react-router-dom'
import {Icon} from 'utils/Icon'
import {nameToPath} from 'utils/utils'
import {ServersState} from '../model'

const minecraft = require('images/minecraft-iconx64.png')
const ark = require('images/ark-iconx64.png')

interface ServersListItemProps {
    servers: ServersState
    players: PlayersState
    basePath: string
}
export function serverListItems({servers, basePath, players}: ServersListItemProps) {
    const result: Array<React.ReactElement<ListItem>> = []
    servers.data.map((server) => {
        const path = basePath + nameToPath(server.slug)
        const icon = {
            minecraft,
            ark,
        }[server.gameType]
        const playerCount = (((players||{})[server.bungeeID])||[]).length
        result.push(
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
                leftIcon={
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        width: 'auto',
                        margin: '0 0 0 12px',
                    }}>
                        <div style={{
                            backgroundImage: 'url('+icon+')',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            width: 30,
                            height: 30,
                        }}/>
                    </div>
                }
                rightIcon={playerCount > 0 ?
                    <div style={{
                        backgroundColor: '#BBB',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '1em',
                        color: 'white',
                        fontSize: '80%',
                        width: 'auto',
                        padding: '0 0.5em',
                    }}>
                        <Icon name="user" style={{marginRight: 5}} size={12}/>
                        {playerCount}
                    </div>
                    : undefined
                }
            />,
        )
    })
    return result
}
