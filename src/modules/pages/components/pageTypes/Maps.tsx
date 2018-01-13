import {WebsiteFrame} from 'components/WebsiteFrame'
import {Loading} from 'modules/pages/components/Loading'
import {ServersState} from 'modules/servers/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {Redirect, RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {nameToPath} from 'utils/utils'

interface MapsProps {
    basePath: string
}
type AllMapsProps = MapsProps & StateToProps & RouteComponentProps<{one: string}>
class MapsDisplay extends React.PureComponent<AllMapsProps, {}> {
    public constructor(props: AllMapsProps) {
        super(props)
        this.switchToTab = this.switchToTab.bind(this)
    }

    public render() {
        const {servers} = this.props

        if(servers.isFetching && !servers.data.length) {
            return <Loading />
        }

        for(const server of servers.data) {
            // No server map selected yet, redirect to the first one
            if(!this.props.match.params.one) {
                return <Redirect to={this.props.basePath + '/' + nameToPath(server.slug)}/>
            }

            // This is not the server that is indicated by the url, continue to the next one
            if(this.props.match.params.one !== nameToPath(server.slug)) {
                continue
            }

            return <WebsiteFrame src={server.dynmapLink} />
        }

        return <Redirect to={this.props.basePath} />
    }

    /**
     * Switch to a certain tab
     * @param value
     */
    private switchToTab(value: string) {
        this.props.history.push({pathname: this.props.basePath+'/'+value})
    }
}

interface StateToProps {
    servers: ServersState
}
export const Maps = withRouter<MapsProps & RouteComponentProps<any>>(connect<StateToProps, {}, MapsProps, AppState>(
    (state) => ({
        servers: state.servers,
    }),
)(MapsDisplay))
