import {Loading} from 'modules/pages/components/Loading'
import {MapDetails} from 'modules/pages/components/pageTypes/MapDetails'
import {NotFound} from 'modules/pages/components/pageTypes/NotFound'
import {ServersState} from 'modules/servers/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router'
import {AppState} from 'reducer'

interface MapsProps {
    basePath: string
}
type AllMapsProps = MapsProps & StateToProps & RouteComponentProps<{serverId: string}>
class MapsDisplay extends React.PureComponent<AllMapsProps, {}> {

    public render() {
        const {servers, basePath} = this.props

        if(servers.isFetching && !servers.list.length) {
            return <Loading />
        }

        const first = servers.list.map((serverId) => servers.byId[serverId])
            .filter(({dynmapLink}) => dynmapLink)
            [0]

        return (
            <Switch>
                <Route path={basePath+'/:serverId'} render={this.mapDetails}/>
                {first!==undefined &&
                    <Redirect to={basePath + '/' + first.slug} />
                }
                <Route component={NotFound}/>
            </Switch>
        )
    }

    private mapDetails() {
        return <MapDetails />
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
