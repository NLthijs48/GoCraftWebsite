import List, {ListItemText} from 'material-ui/List'
import {LeftIconImage} from 'modules/pages/components/LeftIconImage'
import {MenuItem} from 'modules/pages/components/routing/MenuItem'
import {getServerTypeIcon} from 'modules/servers/components/Servers'
import {ServersState} from 'modules/servers/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'

interface Props {
    basePath: string
}
class MapsSubMenuDisplay extends React.PureComponent<Props & StateToProps & RouteComponentProps<any>, {}> {
    public render() {
        const {servers, basePath} = this.props
        return (
            <List style={{paddingTop: 0}}>
                {servers.list
                    .map((serverId) => servers.byId[serverId])
                    .filter(({dynmapLink}) => dynmapLink)
                    .map((server) => {
                        const path = basePath + server.slug
                        return (
                            <MenuItem key={path} path={path} child>
                                <LeftIconImage image={getServerTypeIcon(server)}/>
                                <ListItemText inset primary={server.name}/>
                            </MenuItem>
                        )
                    })
                }
            </List>
        )
    }
}

interface StateToProps {
    servers: ServersState
}
export const MapsSubMenu = withRouter<Props & RouteComponentProps<any>>(connect<StateToProps, {}, Props, AppState>(
    (state) => ({
        servers: state.servers,
    }),
)(MapsSubMenuDisplay))
