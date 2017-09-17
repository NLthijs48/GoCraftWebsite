import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import {updateDrawerOpen} from 'modules/drawer/actions'
import {DrawerState} from 'modules/drawer/model'
import {Loading} from 'modules/pages/components/Loading'
import {mapsListItems} from 'modules/pages/components/submenus/MapsSubMenu'
import {Page, PageItems, Pages, PagesState} from 'modules/pages/model'
import {PlayersState} from 'modules/players/model'
import {serverListItems} from 'modules/servers/components/ServersSubMenu'
import {ServersState} from 'modules/servers/model'
import React, {ReactElement} from 'react'
import {connect, Dispatch} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import {AppState} from 'reducer'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {isAdmin, nameToPath} from 'utils/utils'
import ListItemProps = __MaterialUI.List.ListItemProps

type AllMenuProps = DispatchToProps & StateToProps & RouteComponentProps<any>
class MenuDisplay extends React.PureComponent<AllMenuProps, {}> {
    public constructor(props: AllMenuProps) {
        super(props)
        this.handleRequestChange = this.handleRequestChange.bind(this)
    }

    public render() {
        const {pages, servers, players} = this.props
        if(pages.isFetching && (!pages || !pages.byId || !pages.rootItems)) {
            return <Loading />
        }

        return (
            <List>
                {pagesToListItems({pages: pages.rootItems, byId: pages.byId, basePath: '/', servers, currentPath: this.props.location.pathname, players})}
            </List>
        )
    }

    private handleRequestChange = (event: any, to: any) => {
        this.props.history.push({pathname: to})
        if(!this.props.drawer.docked) {
            this.props.closeDrawer()
        }
    }
}

/**
 * Build list of menu items
 */
interface PagesToListItemsProps {
    pages: PageItems
    byId: Pages
    basePath: string
    servers: ServersState
    currentPath: string
    players: PlayersState
}
function pagesToListItems(data: PagesToListItemsProps): Array<ReactElement<ListItemProps>> {
    const {byId, pages, basePath, servers, currentPath, players} = data
    const result: Array<ReactElement<ListItemProps>> = []
    pages.map((pageKey) => {
        const page: Page = byId[pageKey]
        if(!isAdmin && page.adminOnly) {
            return
        }

        const path = basePath + nameToPath(page.urlPath || page.title)
        let nested: Array<React.ReactElement<ListItemProps>>|undefined
        let rightIcon: React.ReactElement<any>|undefined
        if(page.type === 'servers') {
            nested = serverListItems({servers, basePath: path + '/', players})
            if(players) {
                const playerCount = Object.keys(players.minecraft) // ['survival', 'kitpvp']
                    .map((serverKey) => players.minecraft[serverKey].length) // [5, 2]
                    .reduce((prev, current) => prev + current, 0) // 7
                + Object.keys(players.ark) // [key]
                    .map((serverKey) => players.ark[serverKey].length) // [5, 2]
                    .reduce((prev, current) => prev + current, 0) // 7
                if(playerCount > 0) {
                    rightIcon = (
                        <div style={{
                            backgroundColor: '#999',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '1em',
                            color: 'white',
                            fontSize: '80%',
                            width: '3em',
                            padding: '0 0.5em',
                        }}>
                            <Icon name="user" style={{marginRight: 5}} size={12}/>
                            <Filler />
                            {playerCount}
                        </div>
                    )
                }
            }
        } else if(page.type === 'maps') {
            nested = mapsListItems({servers, basePath: path+'/'})
        } else if(page.children && page.children.length) {
            nested = pagesToListItems({
                ...data,
                pages: page.children,
                basePath: path + '/',
            })
        }
        result.push(
            <ListItem
                key={path}
                primaryText={page.title}
                containerElement={
                    <NavLink
                        to={path}
                        activeStyle={{color: '#000', display: 'block'}}
                    />
                }
                leftIcon={<Icon name={page.menuIcon||'bars'} color="inherit" size={24} fixedWidth />}
                rightIcon={rightIcon}
                nestedItems={nested}
                style={{color: '#666'}}
                initiallyOpen={currentPath.indexOf(path) === 0}
                open={(currentPath.indexOf(path) === 0 || path==='/servers') ? true : undefined}
            />,
        )
    })
    return result
}

interface StateToProps {
    drawer: DrawerState
    pages: PagesState
    servers: ServersState
    players: PlayersState
}
interface DispatchToProps {
    closeDrawer: () => void
}
export const VerticalMenu = withRouter<any>(connect<StateToProps, DispatchToProps, {}>(
    (state: AppState): StateToProps => ({
        drawer: state.drawer,
        pages: state.pages,
        servers: state.servers,
        players: state.players,
    }),
    (dispatch: Dispatch<any>): DispatchToProps => ({
        closeDrawer: () => dispatch(updateDrawerOpen(false)),
    }),
)(MenuDisplay))
