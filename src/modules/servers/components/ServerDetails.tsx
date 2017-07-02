import {RawContent} from 'components/RawContent'
import RaisedButton from 'material-ui/RaisedButton'
import {PlayersList} from 'modules/players/components/PlayerList'
import {PlayerInfo, PlayersState} from 'modules/players/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import {AppState} from 'reducer'
import {CardItem} from 'utils/CardItem'
import {Icon} from 'utils/Icon'
import {nameToPath} from 'utils/utils'
import {ServerData} from '../model'

// TODO use <Responsive> to go to single column layout

interface ServerProps {
    server: ServerData
}
type AllServerDetailsProps = ServerProps & RouteComponentProps<{}> & StateToProps
class ServerDetailsDisplay extends React.PureComponent<AllServerDetailsProps, {}> {

    public constructor(props: AllServerDetailsProps) {
        super(props)
        this.goBack = this.goBack.bind(this)
    }

    public render() {
        const {server, players} = this.props
        const myPlayers: PlayerInfo[] = players[server.bungeeID] || []
        return (
            <div style={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: '1em',
            }}>
                <RaisedButton
                    label="Back"
                    icon={<Icon name="chevron-left"/>}
                    onTouchTap={this.goBack}
                    style={{marginBottom: '1em'}}
                />

                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start', // Don't stretch items to 100% height
                }}>
                    <CardItem style={{flex: 1}}>
                        <h1>{server.name}</h1>
                        <RawContent content={server.longDescription} />
                    </CardItem>

                    <div style={{
                        width: '30%',
                        marginLeft: '1em',
                    }}>
                        {server.dynmapLink &&
                            <CardItem>
                                <NavLink
                                    to={'/maps/' + nameToPath(server.name)}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        color: 'inherit',
                                    }}
                                >
                                    <h2>View world map</h2>
                                    <div style={{
                                        width: '100%',
                                        padding: '56% 0 0 0',
                                        backgroundImage: 'url(http://map.go-craft.com:8128/tiles/world/flat/3_-1/zzzz_112_-32.jpg)',
                                        backgroundPosition: '50% 50%',
                                        backgroundSize: 'cover',
                                        position: 'relative',
                                        flexShrink: 0,
                                    }}/>
                                </NavLink>
                            </CardItem>
                        }

                        {myPlayers.length > 0 &&
                            <CardItem>
                                <PlayersList players={myPlayers} />
                            </CardItem>
                        }
                    </div>
                </div>
            </div>
        )
    }

    private goBack() {
        const pathParts = this.props.location.pathname.split('/')
        pathParts.pop()
        this.props.history.push({pathname: pathParts.join('/')})
    }
}

interface StateToProps {
    players: PlayersState
}
export const ServerDetails = withRouter<any>(connect<StateToProps, {}, {}>(
    (state: AppState): StateToProps => ({
        players: state.players,
    }),
)(ServerDetailsDisplay))

