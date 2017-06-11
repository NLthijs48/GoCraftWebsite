import {fetchNewsItems} from 'modules/news/actions'
import {fetchPages} from 'modules/pages/actions'
import {fetchMenu} from 'modules/routing/actions'
import {fetchServers} from 'modules/servers/actions'
import React from 'react'
import {connect, Dispatch} from 'react-redux'
import {withRouter} from 'react-router'

class PreFetchComponent extends React.PureComponent<DispatchToProps, {}> {
    public componentDidMount() {
        this.props.fetchMenu('header-menu')
        this.props.fetchPages()
        this.props.fetchServers()
        this.props.fetchNewsItems()
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
}
export const PreFetch = withRouter<any>(connect<{}, DispatchToProps, {}>(
    () => ({}),
    (dispatch: Dispatch<any>): DispatchToProps => ({
        fetchPages: () => dispatch(fetchPages()),
        fetchServers: () => dispatch(fetchServers()),
        fetchNewsItems: () => dispatch(fetchNewsItems()),
        fetchMenu: (source) => dispatch(fetchMenu(source)),
    }),
)(PreFetchComponent))
