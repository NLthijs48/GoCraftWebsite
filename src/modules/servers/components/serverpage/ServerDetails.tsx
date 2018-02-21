import {PageHeader} from 'components/PageHeader'
import Button from 'material-ui/Button'
import {DrawerState} from 'modules/drawer/model'
import {PlayersRow} from 'modules/players/components/PlayersRow'
import {PlayersState} from 'modules/players/model'
import {FeatureCardList} from 'modules/servers/components/serverpage/FeatureCardList'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {Navigate} from 'utils/Navigate'
import {ServerData} from '../../model'

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
                    {server.dynmapLink && <Navigate
                        to={'/maps/' + server.slug}
                        style={{
                            marginTop: '2em',
                            display: 'block',
                        }}
                    >
                        <Button variant="raised">
                            <Icon name="map-o" style={{marginRight: '0.5em'}}/>
                            View map
                        </Button>
                    </Navigate>}

                    <Filler />

                    <PlayersRow players={myPlayers} />
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
}
export const ServerDetails = withRouter<ServerProps & RouteComponentProps<any>>(connect<StateToProps, {}, ServerProps, AppState>(
    (state) => ({
        players: state.players,
        drawer: state.drawer,
    }),
)(ServerDetailsDisplay))
