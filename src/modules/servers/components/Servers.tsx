import React from 'react'
import {connect, Dispatch} from 'react-redux'
import {fetchServers} from '../actions'
import {ServerData, ServersState} from '../model'
import {AppState} from 'reducer'
import {Server} from './Server'
import {Loading} from 'modules/pages/components/Loading'
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router'
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
                    const path = basePath+'/'+server.name.toLowerCase()
                    return <Route key={path} path={path} render={getServerDetailsFunction(server)}/>
                })}
                <Route render={getServerOverviewFunction(this.props)}/>
            </Switch>
        )
    }
}

// Get a render function for the server overview
function getServerOverviewFunction({servers, location}: CombinedServersDisplayProps) {
    return () => {
        return (
            <div style={{marginTop: '2em'}}>
                {servers.data.map((server) => <Server key={server.slug} server={server} path={location.pathname} />)}
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
