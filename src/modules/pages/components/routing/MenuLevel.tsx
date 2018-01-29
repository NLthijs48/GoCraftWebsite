import List, {ListItemProps, ListItemText} from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import {MenuItem} from 'modules/pages/components/routing/MenuItem'
import {MapsSubMenu} from 'modules/pages/components/submenus/MapsSubMenu'
import {Page, PageItems, PagesState} from 'modules/pages/model'
import {ServersMenuItemInfo} from 'modules/servers/components/ServersMenuItemInfo'
import {ServersSubMenu} from 'modules/servers/components/ServersSubMenu'
import {VoteSitesMenuInfo} from 'modules/votesites/components/VoteSitesMenuInfo'
import {VoteSitesSubMenu} from 'modules/votesites/components/VoteSitesSubMenu'
import React, {ReactElement} from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Icon} from 'utils/Icon'
import {isAdmin, nameToPath} from 'utils/utils'

interface Props {
    basePath: string
    currentPath: string
    items: PageItems
    child?: boolean
}

function MenuLevelDisplay(props: Props & StateToProps & RouteComponentProps<any>) {
    const {items, pages, basePath, currentPath, child} = props
    const result: Array<ReactElement<ListItemProps>> = []
    items.map((pageKey) => {
        const page: Page = pages.byId[pageKey]
        if(!isAdmin && page.adminOnly) {
            return
        }

        const path = basePath + nameToPath(page.urlPath || page.title)
        let url
        let nested: React.ReactElement<ListItemProps>|undefined
        let secondary: React.ReactNode
        if(page.type === 'servers') {
            nested = <ServersSubMenu basePath={path + '/'} />
            secondary = <ServersMenuItemInfo />
        } else if(page.type === 'maps') {
            nested = <MapsSubMenu basePath={path + '/'} />
        } else if(page.type === 'vote-sites') {
            nested = <VoteSitesSubMenu basePath={path + '/'} />
            secondary = <VoteSitesMenuInfo />
        } else if(page.type === 'frame') {
            if(page.embedNewTab) {
                url = page.url
            }
        } else if(page.children && page.children.length) {
            nested = <MenuLevel {...props} basePath={path + '/'} items={page.children} child />
        }

        const subMenuOpen = currentPath.startsWith(path)

        result.push(
            <MenuItem key={path} path={url || path} child={child}>
                <Icon name={page.menuIcon || 'bars'} color="#999" size={24} fixedWidth/>
                <ListItemText primary={page.title} secondary={secondary} style={{color: 'inherit'}} />
                {nested && (subMenuOpen ? <Icon name="chevron-up" color="#999" /> : <Icon name="chevron-down" color="#999" />)}
            </MenuItem>,
        )

        if(nested) {
            result.push(
                <Collapse component="li" in={subMenuOpen} timeout="auto" unmountOnExit key={path+'#collapse'}>
                    {nested}
                </Collapse>,
            )
        }
    })
    return (<List>{result}</List>)
}

interface StateToProps {
    pages: PagesState
}
export const MenuLevel = withRouter<Props & RouteComponentProps<any>>(connect<StateToProps, {}, Props, AppState>(
    (state) => ({
        pages: state.pages,
    }),
)(MenuLevelDisplay))
