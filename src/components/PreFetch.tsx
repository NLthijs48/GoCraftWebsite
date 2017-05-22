import React from 'react'
import {connect, Dispatch} from 'react-redux'
import {fetchPages} from '../modules/pages/actions'

class PreFetchComponent extends React.Component<DispatchToProps, {}> {
    public componentDidMount() {
        this.props.fetchPages()
    }

    public render() {
        return null
    }
}

interface DispatchToProps {
    fetchPages: () => void
}
export const PreFetch = connect<{}, DispatchToProps, {}>(
    () => ({}),
    (dispatch: Dispatch<any>): DispatchToProps => ({
        fetchPages: () => dispatch(fetchPages()),
    }),
)(PreFetchComponent)
