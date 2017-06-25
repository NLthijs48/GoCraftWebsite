import {fetchNewsItems} from 'modules/news/actions'
import {fetchOptions} from 'modules/options/actions'
import {fetchPages} from 'modules/pages/actions'
import {fetchMenu} from 'modules/routing/actions'
import {fetchServers} from 'modules/servers/actions'
import {fetchVoteSites} from 'modules/votesites/actions'
import React from 'react'
import {connect, Dispatch} from 'react-redux'
import {withRouter} from 'react-router'

class PreFetchComponent extends React.PureComponent<DispatchToProps, {}> {
    public componentDidMount() {

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

    public render() {
        return null
    }
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
    () => ({}),
    (dispatch: Dispatch<any>): DispatchToProps => ({
        fetchPages: () => dispatch(fetchPages()),
        fetchServers: () => dispatch(fetchServers()),
        fetchNewsItems: () => dispatch(fetchNewsItems()),
        fetchMenu: (source) => dispatch(fetchMenu(source)),
        fetchVoteSites: () => dispatch(fetchVoteSites()),
        fetchOptions: () => dispatch(fetchOptions()),
    }),
)(PreFetchComponent))
