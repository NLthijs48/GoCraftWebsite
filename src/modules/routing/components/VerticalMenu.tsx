import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import {makeSelectable} from 'material-ui/List/makeSelectable'
import {updateDrawerOpen} from 'modules/drawer/actions'
import {DrawerState} from 'modules/drawer/model'
import {Page, PagesState} from 'modules/pages/model'
import React, {ReactElement} from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Dispatch} from 'redux'
import {Icon} from 'utils/Icon'
import {nameToPath} from 'utils/utils'
import {fetchMenu} from '../actions'
import {Menu, MenuEntry, MenuItems, MenuState} from '../model'

const SelectableList = makeSelectable(List)

interface MenuProps {
    source: string
}
type AllMenuProps = MenuProps & DispatchToProps & StateToProps & RouteComponentProps<any>
class MenuDisplay extends React.Component<AllMenuProps, {}> {
    public constructor(props: AllMenuProps) {
        super(props)
        this.handleRequestChange = this.handleRequestChange.bind(this)
    }

    public componentWillMount() {
        this.props.fetchMenu()
    }

    public render() {
        const items = this.props.menu.items
        const byId = this.props.menu.byId
        return (
            <SelectableList
                value={this.props.location.pathname}
                onChange={this.handleRequestChange}
            >
                {items && byId && menuToListItems({items, byId, basePath: '/', pages: this.props.pages})}
            </SelectableList>
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
 * @param items Items to render
 * @param byId Lookup for information about the items
 * @param basePath Path these items are rendered in
 * @param pages Pages to use for resolving url paths
 * @returns {Array<ReactElement<{}>>} List of elements to be rendered for this menu
 */
interface MenuToListItemsProps {
    items: MenuItems
    byId: Menu
    basePath: string
    pages: PagesState
}
function menuToListItems(data: MenuToListItemsProps): Array<ReactElement<{}>> {
    const {byId, items, pages, basePath} = data
    const result: Array<ReactElement<{}>> = []
    items.map((menuItemKey) => {
        const menuItem: MenuEntry = byId[menuItemKey]
        let path = nameToPath(menuItem.title)
        let icon = 'bars'
        if(pages.byId && pages.byId[menuItem.page]) {
            const page: Page = pages.byId[menuItem.page]
            if(page.urlPath) {
                path = nameToPath(page.urlPath)
            }
            if(page.menuIcon) {
                icon = page.menuIcon
            }
        }
        path = basePath + path

        const children = menuItem.children
        result.push(
            <ListItem
                key={path}
                value={path}
                primaryText={menuItem.title}
                leftIcon={<Icon name={icon} color="#777777" size={24} fixedWidth />}
                nestedItems={children && children.length ? menuToListItems({...data, items: children, basePath: path + '/'}) : undefined}
            />,
        )
    })
    return result
}

interface StateToProps {
    menu: MenuState
    drawer: DrawerState
    pages: PagesState
}
interface DispatchToProps {
    fetchMenu: () => void
    closeDrawer: () => void
}
export const VerticalMenu = withRouter<any>(connect<StateToProps, DispatchToProps, MenuProps>(
    (state: AppState, ownProps: MenuProps): StateToProps => ({
        menu: state.menus[ownProps.source] || {},
        drawer: state.drawer,
        pages: state.pages,
    }),
    (dispatch: Dispatch<any>, ownProps: MenuProps): DispatchToProps => ({
        fetchMenu: () => dispatch(fetchMenu(ownProps.source)),
        closeDrawer: () => dispatch(updateDrawerOpen(false)),
    }),
)(MenuDisplay))
