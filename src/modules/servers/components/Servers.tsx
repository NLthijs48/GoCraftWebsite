import React from 'react'
import {connect, Dispatch} from 'react-redux'
import {fetchServers} from '../actions'
import {ServersState} from '../model'
import {AppState} from '../../../reducer'
import {Server} from './Server'
import {Loading} from '../../pages/components/Loading'

class ServersDisplay extends React.Component<DispatchToProps & StateToProps, {}> {
    public componentDidMount() {
        this.props.fetchServers()
    }

    public render() {
        if(this.props.servers.isFetching && !this.props.servers.data.length) {
            return <Loading />
        }

        return (
            <div className="card-deck container" style={{marginTop: 10}}>
                {this.props.servers.data.map((server) => <Server key={server.slug} server={server}/>)}
            </div>
        )
    }
}

interface StateToProps {
    servers: ServersState
}
interface DispatchToProps {
    fetchServers: () => void
}
export const Servers = connect<StateToProps, DispatchToProps, {}>(
    (state: AppState): StateToProps => ({
        servers: state.servers,
    }),
    (dispatch: Dispatch<any>): DispatchToProps => ({
        fetchServers: () => dispatch(fetchServers()),
    }),
)(ServersDisplay)
