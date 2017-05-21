import React from 'react'
import Server from './Server'
import {connect, Dispatch} from 'react-redux'
import {fetchServers} from '../actions'
import {ServersState} from '../model'
import {AppState} from '../../../reducer'

interface ServersProps {
    fetchServers: () => void
    servers: ServersState
}

class Servers extends React.Component<ServersProps, {}> {
    public componentDidMount() {
        this.props.fetchServers()
    }

    public render() {
        if(this.props.servers.isFetching && !this.props.servers.data.length) {
            // TODO pretty loading indicator
            return <div>Loading...</div>
        }

        return (
            <div className="card-deck container" style={{marginTop: 10}}>
                {this.props.servers.data.map((server) => <Server key={server.slug} server={server}/>)}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchServers: () => {
            dispatch(fetchServers())
        },
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        servers: state.servers,
    }
}

export default connect<{}, {}, {}>(
    mapStateToProps,
    mapDispatchToProps,
)(Servers)