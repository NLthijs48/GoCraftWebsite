import {RawContent} from 'components/RawContent'
import FlatButton from 'material-ui/FlatButton'
import {DrawerState} from 'modules/drawer/model'
import {PlayersRow} from 'modules/players/components/PlayersRow'
import {PlayersState} from 'modules/players/model'
import {FeatureCardList} from 'modules/servers/components/serverpage/FeatureCardList'
import * as React from 'react'
import {ContentRect} from 'react-measure'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import {AppState} from 'reducer'
import {CardItem} from 'utils/CardItem'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {Responsive} from 'utils/Responsive'
import {nameToPath} from 'utils/utils'
import {ServerData} from '../../model'

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
        const myPlayers = ({
            minecraft: players.minecraft[server.bungeeID || ''],
            ark: players.ark.default,
        }[server.gameType] || [])

        return (
            <div style={{
                width: '100%',
                height: '100%',
                overflow: 'overlay',
                background: '#EEE',
            } as any}>
                <div style={{
                    backgroundImage: 'url('+server.heroImage+')',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '50% 50%',
                    position: 'absolute',
                    top: '-10vh',
                    left: 0,
                    right: 0,
                    height: '70vh',
                    pointerEvents: 'none',
                }} />

                <div style={{
                    width: '100%',
                    height: '70vh',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '-20vh',
                    marginTop: '-10vh',
                    paddingTop: '10vh',
                    zIndex: 10,
                }}>
                    <div style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        width: '100%',
                        zIndex: 1,
                        paddingTop: '0.75em',
                        paddingBottom: '0.75em',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <div style={{
                            maxWidth: 1200,
                            width: '100%',
                            display: 'flex',
                            paddingRight: '1em',
                            paddingLeft: '1em',
                        }}>
                            <div style={{
                                color: '#FFF',
                                marginBottom: 0,
                                fontSize: '150%',
                                fontWeight: 'bold',
                            }}>
                                {server.name}
                            </div>

                            <Filler/>

                            {server.dynmapLink &&
                                <NavLink
                                    to={'/maps/' + nameToPath(server.slug)}
                                >
                                    <FlatButton
                                        style={{color: '#EEE'}}
                                        label="View map"
                                        icon={<Icon name="map-o"/>}
                                    />
                                </NavLink>
                            }
                        </div>
                    </div>

                    <Filler />

                    <div style={{
                        display: 'flex',
                        width: '100%',
                        padding: '1em 1em 0 1em',
                        alignItems: 'center',
                        margin: '0 auto 20vh auto',
                        maxWidth: 1200,
                    }}>
                        <PlayersRow players={myPlayers} />
                    </div>
                </div>

                <Responsive
                    onResize={this.onResize}
                    style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        padding: '1em',
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start', // Don't stretch items to 100% height
                        flexDirection: 'column',
                    }}>
                        <div style={{flex: 1, width: '100%'}}>
                            <FeatureCardList features={server.features}/>

                            {server.longDescription && false &&
                                <CardItem>
                                    <h2>Old content (should be moved into the features above)</h2>
                                    <RawContent content={server.longDescription}/>
                                </CardItem>
                            }
                        </div>
                    </div>
                </Responsive>
            </div>
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
    drawer: DrawerState
}
export const ServerDetails = withRouter<any>(connect<StateToProps, {}, {}>(
    (state: AppState): StateToProps => ({
        players: state.players,
        drawer: state.drawer,
    }),
)(ServerDetailsDisplay))
