import List, {ListItemText} from 'material-ui/List'
import {LeftIconImage} from 'modules/pages/components/LeftIconImage'
import {MenuItem} from 'modules/pages/components/routing/MenuItem'
import {PlayersState} from 'modules/players/model'
import {getServerTypeIcon} from 'modules/servers/components/Servers'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {nameToPath} from 'utils/utils'
import {ServersState} from '../model'

interface Props {
    basePath: string
}
function ServersSubMenuDisplay({servers, basePath, players}: Props & StateToProps & RouteComponentProps<any>) {
    return (
        <List style={{paddingTop: 0}}>
            {servers.list.map((serverId) => {
                const server = servers.byId[serverId]
                const path = basePath + nameToPath(server.slug)
                const playerCount = ({
                    minecraft: players.minecraft[server.bungeeID || ''],
                    ark: players.ark.default,
                }[server.gameType] || []).length
                return (
                    <MenuItem key={path} path={path} child>
                        <LeftIconImage image={getServerTypeIcon(server)}/>
                        <ListItemText primary={server.name} style={{color: 'inherit'}}/>
                        {playerCount > 0 && <div style={{
                            backgroundColor: '#BBB',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '1em',
                            color: 'white',
                            fontSize: '80%',
                            width: '3em',
                            height: '1.7em',
                            padding: '0 0.5em',
                            fontWeight: 'bold',
                        }}>
                            <Icon name="user" size={12}/>
                            <Filler/>
                            {playerCount}
                        </div>}
                    </MenuItem>
                )
            })}
        </List>
    )
}

interface StateToProps {
    servers: ServersState
    players: PlayersState
}
export const ServersSubMenu = withRouter<Props & RouteComponentProps<any>>(connect<StateToProps, {}, Props, AppState>(
    (state) => ({
        servers: state.servers,
        players: state.players,
    }),
)(ServersSubMenuDisplay))
