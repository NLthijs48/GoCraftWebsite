import {fetchNewsItems} from 'modules/news/actions'
import {fetchOptions} from 'modules/options/actions'
import {fetchPages} from 'modules/pages/actions'
import {fetchMenu} from 'modules/routing/actions'
import {fetchServers} from 'modules/servers/actions'
import {fetchVoteSites} from 'modules/votesites/actions'
import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {withRouter} from 'react-router'
import {AppState} from 'reducer'

class PreFetchComponent extends React.PureComponent<DispatchToProps & StateToProps, {}> {
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

    private doFetching() {
        // Crucial resources
        this.props.fetchMenu('header-menu')
        this.props.fetchPages()
        this.props.fetchServers()

        // Page specific resources
        setTimeout(() => {
            this.props.fetchNewsItems()
            this.props.fetchVoteSites()
            this.props.fetchOptions()
        }, 0)
    }
}

interface StateToProps {
    reducerVersion: number
}
interface DispatchToProps {
    fetchPages: () => void
    fetchServers: () => void
    fetchNewsItems: () => void
    fetchMenu: (source: string) => void
    fetchVoteSites: () => void,
    fetchOptions: () => void,
}
export const PreFetch = withRouter<any>(connect<{}, DispatchToProps, {}>(
    (state: AppState) => ({
        reducerVersion: state.reducerVersion,
    }),
    (dispatch: Dispatch<any>): DispatchToProps => ({
        fetchPages: () => dispatch(fetchPages()),
        fetchServers: () => dispatch(fetchServers()),
        fetchNewsItems: () => dispatch(fetchNewsItems()),
        fetchMenu: (source) => dispatch(fetchMenu(source)),
        fetchVoteSites: () => dispatch(fetchVoteSites()),
        fetchOptions: () => dispatch(fetchOptions()),
    }),
)(PreFetchComponent))
