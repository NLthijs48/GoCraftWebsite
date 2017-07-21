import {fetchNewsItems} from 'modules/news/actions'
import {fetchOptions} from 'modules/options/actions'
import {fetchPages} from 'modules/pages/actions'
import {fetchArkPlayers} from 'modules/players/actions'
import {fetchServers} from 'modules/servers/actions'
import {fetchVoteSites} from 'modules/votesites/actions'
import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {withRouter} from 'react-router'
import {AppState} from 'reducer'

class PreFetchComponent extends React.PureComponent<DispatchToProps & StateToProps, {}> {
    private interval: number

    public componentDidMount() {
        this.doFetching()
    }

    public render() {
        return null
    }

    public componentWillReceiveProps(nextProps: DispatchToProps & StateToProps) {
        if(this.props.reducerVersion < nextProps.reducerVersion) {
            console.log('New reducer version, fetching all data:', nextProps.reducerVersion)
            this.doFetching()
        }
    }

    public componentWillUnmount() {
        clearInterval(this.interval)
    }

    private doFetching() {
        // Crucial resources
        this.props.fetchPages()
        this.props.fetchServers()

        // Page specific resources
        setTimeout(() => {
            this.props.fetchNewsItems()
            this.props.fetchVoteSites()
            this.props.fetchOptions()
        }, 10)

        this.interval = setInterval(() => {
            this.props.fetchArkPlayers()
        }, 30*1000)
    }
}

interface StateToProps {
    reducerVersion: number
}
interface DispatchToProps {
    fetchPages: () => void
    fetchServers: () => void
    fetchNewsItems: () => void
    fetchVoteSites: () => void,
    fetchOptions: () => void,
    fetchArkPlayers: () => void,
}
export const PreFetch = withRouter<any>(connect<StateToProps, DispatchToProps, {}>(
    (state: AppState): StateToProps => ({
        reducerVersion: state.reducerVersion,
    }),
    (dispatch: Dispatch<any>): DispatchToProps => ({
        fetchPages: () => dispatch(fetchPages()),
        fetchServers: () => dispatch(fetchServers()),
        fetchNewsItems: () => dispatch(fetchNewsItems()),
        fetchVoteSites: () => dispatch(fetchVoteSites()),
        fetchOptions: () => dispatch(fetchOptions()),
        fetchArkPlayers: () => dispatch(fetchArkPlayers()),
    }),
)(PreFetchComponent))
