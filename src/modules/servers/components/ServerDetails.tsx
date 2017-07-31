import {RawContent} from 'components/RawContent'
import RaisedButton from 'material-ui/RaisedButton'
import {PlayersList} from 'modules/players/components/PlayerList'
import {PlayersState} from 'modules/players/model'
import * as React from 'react'
import {ContentRect} from 'react-measure'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import {AppState} from 'reducer'
import {CardItem} from 'utils/CardItem'
import {Icon} from 'utils/Icon'
import {Responsive} from 'utils/Responsive'
import {nameToPath} from 'utils/utils'
import {ServerData} from '../model'

interface ServerProps {
    server: ServerData
}
type AllServerDetailsProps = ServerProps & RouteComponentProps<{}> & StateToProps
class ServerDetailsDisplay extends React.PureComponent<AllServerDetailsProps, {singleColumn: boolean}> {

    public constructor(props: AllServerDetailsProps) {
        super(props)
        this.goBack = this.goBack.bind(this)
        this.state = {singleColumn: false}
        this.onResize = this.onResize.bind(this)
    }

    public render() {
        const {server, players} = this.props
        const {singleColumn} = this.state

        const myPlayers = ({
            minecraft: players.minecraft[server.bungeeID || ''],
            ark: players.ark.default,
        }[server.gameType] || [])

        return (
            <Responsive
                onResize={this.onResize}
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '1em',
                }}
            >
                <RaisedButton
                    label="Back"
                    icon={<Icon name="chevron-left"/>}
                    onTouchTap={this.goBack}
                    style={{marginBottom: '1em'}}
                />

                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start', // Don't stretch items to 100% height
                    flexDirection: singleColumn ? 'column' : 'row',
                }}>
                    <CardItem style={{flex: 1}}>
                        <h1>{server.name}</h1>
                        <RawContent content={server.longDescription} />
                    </CardItem>

                    <div style={{
                        width: singleColumn ? '100%' : '30%',
                        marginLeft: singleColumn ? 0 : '1em',
                    }}>
                        {server.dynmapLink &&
                            <CardItem
                                style={{padding: 0}}
                            >
                                <NavLink
                                    to={'/maps/' + nameToPath(server.slug)}
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
                                        backgroundImage: server.dynmapPreview ? 'url('+server.dynmapPreview+')' : 'url(http://map.go-craft.com:8128/tiles/world/flat/3_-1/zzzz_112_-32.jpg)',
                                        backgroundColor: '#888',
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
                                            display: 'flex',
                                        }}>
                                            <div style={{
                                                fontSize: '1.25em',
                                            }}>
                                                View world map
                                            </div>
                                        </div>
                                    </div>
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
            </Responsive>
        )
    }

    private goBack() {
        const pathParts = this.props.location.pathname.split('/')
        pathParts.pop()
        this.props.history.push({pathname: pathParts.join('/')})
    }

    private onResize(contentRect: ContentRect) {
        this.setState({singleColumn: contentRect.bounds.width < 800})
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
