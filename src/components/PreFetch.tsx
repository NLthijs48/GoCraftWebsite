import React from 'react'
import {connect, Dispatch} from 'react-redux'
import {fetchPages} from '../modules/pages/actions'
import {fetchServers} from '../modules/servers/actions'
import {withRouter} from 'react-router'

class PreFetchComponent extends React.Component<DispatchToProps, {}> {
    public componentDidMount() {
        this.props.fetchPages()
        this.props.fetchServers()
    }

    public render() {
        return null
    }
}

interface DispatchToProps {
    fetchPages: () => void
    fetchServers: () => void
}
export const PreFetch = withRouter<any>(connect<{}, DispatchToProps, {}>(
    () => ({}),
    (dispatch: Dispatch<any>): DispatchToProps => ({
        fetchPages: () => dispatch(fetchPages()),
        fetchServers: () => dispatch(fetchServers()),
    }),
)(PreFetchComponent))
