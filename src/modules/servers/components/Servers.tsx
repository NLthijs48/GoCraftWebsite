import {AbsoluteScroller} from 'components/AbsoluteScroller'
import {Loading} from 'modules/pages/components/Loading'
import {NotFound} from 'modules/pages/components/pageTypes/NotFound'
import {ServersOverview} from 'modules/servers/components/ServersOverview'
import * as React from 'react'
import {connect} from 'react-redux'
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Fade} from 'utils/Fade'
import {ServerData, ServersState} from '../model'
import {ServerDetails} from './serverpage/ServerDetails'

const minecraft = require('images/minecraft-iconx64.png')
const ark = require('images/ark-iconx64.png')
export function getServerTypeIcon(server: ServerData): string {
    return {
        minecraft,
        ark,
    }[server.gameType]
}

interface ServersProps {
    basePath: string
}
type CombinedServersDisplayProps = ServersProps & StateToProps & RouteComponentProps<any>
class ServersDisplay extends React.PureComponent<CombinedServersDisplayProps, {}> {
    public render() {
        const {servers, basePath} = this.props

        if(servers.isFetching && !servers.list.length) {
            return <Loading />
        }

        return (
            <Fade id={this.props.location.pathname.split('/')[2] || 'base'}>
                <AbsoluteScroller>
                    <Switch location={this.props.location}>
                        <Route path={basePath+'/:serverId'} render={this.serverDetails}/>
                        <Route path={basePath+'/'} exact render={this.serversOverview}/>
                        <Route component={NotFound}/>
                    </Switch>
                </AbsoluteScroller>
            </Fade>
        )
    }

    private serverDetails = () => {
        return <ServerDetails />
    }

    private serversOverview = () => {
        return <ServersOverview servers={this.props.servers} basePath={this.props.basePath} />
    }
}

interface StateToProps {
    servers: ServersState
}
export const Servers = withRouter<ServersProps & RouteComponentProps<any>>(connect<StateToProps, {}, ServersProps, AppState>(
    (state) => ({
        servers: state.servers,
    }),
)(ServersDisplay))
