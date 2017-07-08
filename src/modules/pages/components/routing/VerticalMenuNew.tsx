import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import {makeSelectable} from 'material-ui/List/makeSelectable'
import {updateDrawerOpen} from 'modules/drawer/actions'
import {DrawerState} from 'modules/drawer/model'
import {Loading} from 'modules/pages/components/Loading'
import {Page, PageItems, Pages, PagesState} from 'modules/pages/model'
import React, {ReactElement} from 'react'
import {connect, Dispatch} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {THEME} from 'types'
import {Icon} from 'utils/Icon'
import {nameToPath} from 'utils/utils'

const SelectableList = makeSelectable(List)

type AllMenuProps = DispatchToProps & StateToProps & RouteComponentProps<any>
class MenuDisplay extends React.PureComponent<AllMenuProps, {}> {
    public constructor(props: AllMenuProps) {
        super(props)
        this.handleRequestChange = this.handleRequestChange.bind(this)
    }

    public render() {
        const pages = this.props.pages
        if(pages.isFetching && (!pages || !pages.byId || !pages.rootItems)) {
            return <Loading />
        }

        return (
            <SelectableList
                value={this.props.location.pathname}
                onChange={this.handleRequestChange}
                selectedItemStyle={{
                    backgroundColor: THEME.palette.primary1Color,
                    color: '#FFF',
                }}
            >
                {pagesToListItems({pages: pages.rootItems, byId: pages.byId, basePath: '/'})}
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
interface PagesToListItemsProps {
    pages: PageItems
    byId: Pages
    basePath: string
}
function pagesToListItems(data: PagesToListItemsProps): Array<ReactElement<{}>> {
    const {byId, pages, basePath} = data
    const result: Array<ReactElement<{}>> = []
    pages.map((pageKey) => {
        const page: Page = byId[pageKey]
        const path = basePath + nameToPath(page.urlPath || page.title)
        const children = page.children
        result.push(
            <ListItem
                key={path}
                value={path}
                primaryText={page.title}
                leftIcon={<Icon name={page.menuIcon||'bars'} color="inherit" size={24} fixedWidth />}
                nestedItems={children && children.length ? pagesToListItems({byId, pages: children, basePath: path + '/'}) : undefined}
                style={{color: '#666'}}
            />,
        )
    })
    return result
}

interface StateToProps {
    drawer: DrawerState
    pages: PagesState
}
interface DispatchToProps {
    closeDrawer: () => void
}
export const VerticalMenu = withRouter<any>(connect<StateToProps, DispatchToProps, {}>(
    (state: AppState): StateToProps => ({
        drawer: state.drawer,
        pages: state.pages,
    }),
    (dispatch: Dispatch<any>): DispatchToProps => ({
        closeDrawer: () => dispatch(updateDrawerOpen(false)),
    }),
)(MenuDisplay))
