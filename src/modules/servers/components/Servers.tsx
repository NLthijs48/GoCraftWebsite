import {Loading} from 'modules/pages/components/Loading'
import {ServersOverview} from 'modules/servers/components/ServersOverview'
import * as React from 'react'
import {connect} from 'react-redux'
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {nameToPath} from 'utils/utils'
import {ServerData, ServersState} from '../model'
import {ServerDetails} from './ServerDetails'

interface ServersProps {
    basePath: string
}
type CombinedServersDisplayProps = ServersProps & StateToProps & RouteComponentProps<any>
class ServersDisplay extends React.PureComponent<CombinedServersDisplayProps, {}> {
    public render() {
        const {servers, basePath} = this.props

        if(servers.isFetching && !servers.data.length) {
            return <Loading />
        }

        return (
            <Switch>
                {servers.data.map((server) => {
                    const path = basePath+'/'+nameToPath(server.name)
                    return <Route key={path} path={path} render={getServerDetailsFunction(server)}/>
                })}
                <Route render={getServerOverviewFunction(this.props)}/>
            </Switch>
        )
    }
}

// Get a render function for the server overview
function getServerOverviewFunction({servers, basePath}: CombinedServersDisplayProps) {
    return () => {
        return (
            <ServersOverview servers={servers} basePath={basePath} />
        )
    }
}

function getServerDetailsFunction(server: ServerData) {
    return () => <ServerDetails server={server} />
}

interface StateToProps {
    servers: ServersState
}
export const Servers = withRouter<any>(connect<StateToProps, {}, ServersProps>(
    (state: AppState): StateToProps => ({
        servers: state.servers,
    }),
)(ServersDisplay))
