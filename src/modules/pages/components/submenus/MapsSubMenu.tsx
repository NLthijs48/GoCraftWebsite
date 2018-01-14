import {ListItemText} from 'material-ui'
import List from 'material-ui/List'
import {LeftIconImage} from 'modules/pages/components/LeftIconImage'
import {MenuItem} from 'modules/pages/components/routing/MenuItem'
import {getServerTypeIcon} from 'modules/servers/components/Servers'
import {ServersState} from 'modules/servers/model'
import * as React from 'react'
import {nameToPath} from 'utils/utils'

interface MapsListItemsProps {
    servers: ServersState
    basePath: string
}
export function mapsListItems({servers, basePath}: MapsListItemsProps) {
    return (
        <List>
            {servers.data
                .filter(({dynmapLink}) => dynmapLink)
                .map((server) => {
                    const path = basePath + nameToPath(server.slug)
                    return (
                        <MenuItem key={path} path={path}>
                            <LeftIconImage image={getServerTypeIcon(server)}/>
                            <ListItemText inset primary={server.name}/>
                        </MenuItem>
                    )
                })
            }
        </List>
    )
}
