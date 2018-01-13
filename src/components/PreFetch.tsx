import {fetchNewsItems} from 'modules/news/actions'
import {fetchOptions} from 'modules/options/actions'
import {fetchPages} from 'modules/pages/actions'
import {fetchArkPlayers} from 'modules/players/actions'
import {fetchServers} from 'modules/servers/actions'
import {fetchShopInfo} from 'modules/shop/actions'
import {fetchVoteSites} from 'modules/votesites/actions'
import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {withRouter} from 'react-router'
import {AppState} from 'reducer'
import Timer = NodeJS.Timer

class PreFetchComponent extends React.PureComponent<DispatchToProps & StateToProps, {}> {
    private interval: Timer

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
            this.props.fetchArkPlayers()
            this.props.fetchShopInfo()
        }, 10)

        // TODO: replace this by getting updates from the websocket (and let the server poll)
        this.interval = setInterval(() => {
            this.props.fetchArkPlayers()
        }, 10*1000)
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
    fetchShopInfo: () => void,
}
export const PreFetch = withRouter<any>(connect<StateToProps, DispatchToProps, {}, AppState>(
    (state) => ({
        reducerVersion: state.reducerVersion,
    }),
    (dispatch: Dispatch<any>): DispatchToProps => ({
        fetchPages: () => dispatch(fetchPages()),
        fetchServers: () => dispatch(fetchServers()),
        fetchNewsItems: () => dispatch(fetchNewsItems()),
        fetchVoteSites: () => dispatch(fetchVoteSites()),
        fetchOptions: () => dispatch(fetchOptions()),
        fetchArkPlayers: () => dispatch(fetchArkPlayers()),
        fetchShopInfo: () => dispatch(fetchShopInfo()),
    }),
)(PreFetchComponent))
