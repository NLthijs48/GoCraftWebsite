import Button from 'material-ui/Button'
import {PlayersState} from 'modules/players/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {CardItem} from 'utils/CardItem'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {Image} from 'utils/Image'
import {ImageFooter} from 'utils/ImageFooter'
import {Navigate} from 'utils/Navigate'
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
                <Navigate
                    to={path+'/'+nameToPath(server.slug)}
                    style={{
                        width: '100%',
                        height: '100%',
                        color: 'inherit',
                        flex: 1,
                        textDecoration: 'none',
                    }}
                >
                    <Image image={server.image} ratio={16/9} maxWidth={800}>
                        <ImageFooter>
                            <h2>{server.name}</h2>
                        </ImageFooter>
                    </Image>
                    <div style={{
                        margin: '1em 1em 0 1em',
                    }}>
                        {server.shortDescription}
                    </div>
                </Navigate>

                <Filler />

                <div style={{
                    marginTop: '-0.6em', // Reduce the room between tagline and actions
                    paddingLeft: '0',
                    paddingBottom: '0.4em',
                    minHeight: 42,
                }}>
                    {server.dynmapLink && <Navigate
                        style={{textDecoration: 'none'}}
                        to={'/maps/' + nameToPath(server.slug)}
                    >
                        <Button>
                            <Icon name="map-o" fixedWidth style={{marginRight: '1em'}}/>
                            View map
                        </Button>
                    </Navigate>}

                    {myPlayerCount > 0 && <Navigate
                        style={{textDecoration: 'none'}}
                        to={path+'/'+nameToPath(server.slug)}
                    >
                        <Button>
                            <Icon name={myPlayerCount > 1 ? 'users' : 'user'} fixedWidth style={{marginRight: '0.5em'}}/>
                            {myPlayerCount + ' online'}
                        </Button>
                    </Navigate>}
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
