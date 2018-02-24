import {WebsiteFrame} from 'components/WebsiteFrame'
import {ServerData} from 'modules/servers/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {Redirect, RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'

class MapDetailsDisplay extends React.PureComponent<StateToProps & RouteComponentProps<any>, {}> {
    public render() {
        const {server} = this.props

        if(!server || !server.dynmapLink) {
            const pathParts = this.props.location.pathname.split('/')
            pathParts.pop()
            return <Redirect to={pathParts.join('/')} />
        }

        return <WebsiteFrame src={server.dynmapLink} />
    }
}

interface StateToProps {
    server?: ServerData
}
export const MapDetails = withRouter<any>(connect<StateToProps, {}, RouteComponentProps<any>, AppState>(
    (state, ownProps) => ({
        server: state.servers.byId[state.servers.bySlug[ownProps.match.params.serverId]],
    }),
)(MapDetailsDisplay))
