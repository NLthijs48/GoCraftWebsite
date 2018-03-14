import {PageHeader} from 'components/PageHeader'
import Button from 'material-ui/Button'
import {DrawerState} from 'modules/drawer/model'
import {PlayersRow} from 'modules/players/components/PlayersRow'
import {PlayersState} from 'modules/players/model'
import {ArkJoinButton} from 'modules/servers/components/join/ArkJoinButton'
import {MinecraftCopyButton} from 'modules/servers/components/join/MinecraftCopyButton'
import {FeatureCardList} from 'modules/servers/components/serverpage/FeatureCardList'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {Navigate} from 'utils/Navigate'
import {ServerData} from '../../model'

type AllServerDetailsProps = RouteComponentProps<any> & StateToProps
class ServerDetailsDisplay extends React.PureComponent<AllServerDetailsProps, {}> {

    public constructor(props: AllServerDetailsProps) {
        super(props)
        this.goBack = this.goBack.bind(this)
    }

    public render() {
        const {server, players} = this.props
        const myPlayers = ({
            minecraft: players.minecraft[server.bungeeID || ''],
            ark: players.ark.default,
        }[server.gameType] || [])

        return (
            <PageHeader
                image={server.heroImage}
                primary={server.name}
                secondary={server.shortDescription}
                header={<React.Fragment>
                    <div style={{display: 'flex'}}>
                        {server.gameType === 'minecraft' && <MinecraftCopyButton short />}
                        {server.gameType === 'ark' && <ArkJoinButton short />}

                        {server.dynmapLink && <Navigate to={'/maps/' + server.slug} style={{marginLeft: '1em'}}>
                            <Button variant="raised">
                                View map
                                <Icon name="map-o" style={{marginLeft: '0.5em'}}/>
                            </Button>
                        </Navigate>}
                    </div>

                    <Filler />

                    <PlayersRow players={myPlayers} style={{marginTop: '1em'}} />
                </React.Fragment>
            }>
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start', // Don't stretch items to 100% height
                    flexDirection: 'column',
                }}>
                    <div style={{flex: 1, width: '100%'}}>
                        <FeatureCardList features={server.features}/>
                    </div>
                </div>
            </PageHeader>
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
    drawer: DrawerState
    server: ServerData
}
export const ServerDetails = withRouter<RouteComponentProps<any>>(connect<StateToProps, {}, RouteComponentProps<any>, AppState>(
    (state, ownProps) => ({
        players: state.players,
        drawer: state.drawer,
        server: state.servers.byId[state.servers.bySlug[ownProps.match.params.serverId]],
    }),
)(ServerDetailsDisplay))
