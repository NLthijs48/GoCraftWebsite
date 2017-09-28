import ListItem from 'material-ui/List/ListItem'
import {VoteSitesState} from 'modules/votesites/model'
import * as React from 'react'
import {NavLink} from 'react-router-dom'
import {nameToPath} from 'utils/utils'

interface VoteSitesItemsProps {
    voteSites: VoteSitesState
    basePath: string
}
export function voteSitesToListItems({voteSites, basePath}: VoteSitesItemsProps) {
    return voteSites.items
        .map((voteSiteId) => {
            const voteSite = voteSites.byId[voteSiteId]
            const path = basePath + nameToPath(voteSite.name)
            return (
                <ListItem
                    key={path}
                    primaryText={voteSite.name}
                    containerElement={
                        <NavLink
                            to={path}
                            activeStyle={{color: '#000', display: 'block'}}
                        />
                    }
                    style={{color: '#666'}}
                />
            )
        })
}
