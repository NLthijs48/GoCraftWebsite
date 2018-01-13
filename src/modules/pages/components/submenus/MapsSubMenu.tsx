import {ListItemText} from 'material-ui'
import ListItem from 'material-ui/List/ListItem'
import {LeftIconImage} from 'modules/pages/components/LeftIconImage'
import {getServerTypeIcon} from 'modules/servers/components/Servers'
import {ServersState} from 'modules/servers/model'
import * as React from 'react'
import {NavLink} from 'react-router-dom'
import {nameToPath} from 'utils/utils'

interface MapsListItemsProps {
    servers: ServersState
    basePath: string
}
export function mapsListItems({servers, basePath}: MapsListItemsProps) {
    return servers.data
        .filter(({dynmapLink}) => dynmapLink)
        .map((server) => {
            const path = basePath + nameToPath(server.slug)
            return (
                <ListItem
                    button
                    key={path}
                    containerElement={
                        <NavLink
                            to={path}
                            activeStyle={{color: '#000', display: 'block'}}
                        />
                    }
                    style={{color: '#666'}}
                    leftIcon={<LeftIconImage image={getServerTypeIcon(server)}/>}
                >
                    <ListItemText inset primary={server.name} />
                </ListItem>
            )
        })
}
