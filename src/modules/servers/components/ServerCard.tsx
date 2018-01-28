import Button from 'material-ui/Button'
import {PlayersState} from 'modules/players/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
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
class ServerCardDisplay extends React.PureComponent<ServerProps & StateToProps & RouteComponentProps<any>, {}> {
    public render() {
        const {server, path, players} = this.props

        const myPlayerCount = ({
            minecraft: players.minecraft[server.bungeeID||''],
            ark: players.ark.default,
        }[server.gameType] || []).length

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
                        textDecoration: 'none',
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
                            <h2 style={{marginBottom: 0}}>
                                {server.name}
                            </h2>
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
                    paddingLeft: '0',
                    paddingBottom: '0.4em',
                    minHeight: 42,
                }}>
                    {server.dynmapLink &&
                    <NavLink
                        style={{textDecoration: 'none'}}
                        to={'/maps/' + nameToPath(server.slug)}
                    >
                        <Button>
                            <Icon name="map-o" fixedWidth style={{marginRight: '0.5em'}}/>
                            View map
                        </Button>
                    </NavLink>
                    }

                    {myPlayerCount > 0 &&
                    <NavLink
                        style={{textDecoration: 'none'}}
                        to={path+'/'+nameToPath(server.slug)}
                    >
                        <Button>
                            <Icon name={myPlayerCount > 1 ? 'users' : 'user'} fixedWidth style={{marginRight: '0.5em'}}/>
                            {myPlayerCount + ' online'}
                        </Button>
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
export const ServerCard = withRouter<ServerProps & RouteComponentProps<any>>(connect<StateToProps, {}, ServerProps, AppState>(
    (state) => ({
        players: state.players,
    }),
)(ServerCardDisplay))
