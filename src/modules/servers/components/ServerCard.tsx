import FlatButton from 'material-ui/FlatButton'
import {PlayerInfo, PlayersState} from 'modules/players/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import {AppState} from 'reducer'
import {CardItem} from 'utils/CardItem'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {nameToPath} from 'utils/utils'
import {ServerData} from '../model'

interface ServerProps {
    server: ServerData
    path: string
}
export class ServerCardDisplay extends React.PureComponent<ServerProps & StateToProps, {}> {
    public render() {
        const {server, path, players} = this.props

        const myPlayers: PlayerInfo[] = players[server.bungeeID] || []
        return (
            <CardItem style={{
                height: '100%',
                padding: 0,
            }}>
                <NavLink
                    to={path+'/'+nameToPath(server.slug)}
                    style={{
                        width: '100%',
                        height: '100%',
                        color: 'inherit',
                        flex: 1,
                    }}
                >
                    <div style={{
                        width: '100%',
                        padding: '56% 0 0 0',
                        backgroundImage: 'url(' + server.image + ')',
                        backgroundPosition: '50% 50%',
                        backgroundSize: 'cover',
                        position: 'relative',
                    }}>
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            left: 0,
                            background: 'rgba(0,0,0,0.5)',
                            color: '#FFF',
                            padding: '1em',
                        }}>
                            <div style={{
                                fontSize: '1.25em',
                            }}>
                                {server.name}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        margin: '1em 1em 0 1em',
                    }}>
                        {server.shortDescription}
                    </div>
                </NavLink>

                <Filler />

                <div style={{
                    marginTop: '-0.6em', // Reduce the room between tagline and actions
                    paddingLeft: '0.4em',
                    paddingBottom: '0.4em',
                    minHeight: 42,
                }}>
                    {server.dynmapLink &&
                    <NavLink
                        to={'/maps/' + nameToPath(server.slug)}
                    >
                        <FlatButton
                            label="View map"
                            icon={<Icon name="map-o"/>}
                        />
                    </NavLink>
                    }

                    {myPlayers.length > 0 &&
                    <NavLink
                        to={path+'/'+nameToPath(server.slug)}
                    >
                        <FlatButton
                            label={myPlayers.length+' online'}
                            icon={<Icon name={myPlayers.length > 1 ? 'users' : 'user'} fixedWidth />}
                        />
                    </NavLink>

                    }
                </div>
            </CardItem>
        )
    }
}

interface StateToProps {
    players: PlayersState
}
export const ServerCard = withRouter<any>(connect<StateToProps, {}, ServerProps>(
    (state: AppState): StateToProps => ({
        players: state.players,
    }),
)(ServerCardDisplay))
