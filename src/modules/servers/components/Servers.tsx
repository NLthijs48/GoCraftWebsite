import {Loading} from 'modules/pages/components/Loading'
import React from 'react'
import {connect, Dispatch} from 'react-redux'
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {nameToPath} from 'utils/utils'
import {fetchServers} from '../actions'
import {ServerData, ServersState} from '../model'
import {Server} from './Server'
import {ServerDetails} from './ServerDetails'

interface ServersDisplayProps {
    basePath: string
}
type CombinedServersDisplayProps = ServersDisplayProps & DispatchToProps & StateToProps & RouteComponentProps<any>
class ServersDisplay extends React.Component<CombinedServersDisplayProps, {}> {
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
            <div style={{marginTop: '2em'}}>
                {servers.data.map((server) => <Server key={server.slug} server={server} path={basePath} />)}
            </div>
        )
    }
}

function getServerDetailsFunction(server: ServerData) {
    return () => <ServerDetails server={server}/>
}

interface StateToProps {
    servers: ServersState
}
interface DispatchToProps {
    fetchServers: () => void
}
export const Servers = withRouter<any>(connect<StateToProps, DispatchToProps, ServersDisplayProps>(
    (state: AppState): StateToProps => ({
        servers: state.servers,
    }),
    (dispatch: Dispatch<any>): DispatchToProps => ({
        fetchServers: () => dispatch(fetchServers()),
    }),
)(ServersDisplay))
