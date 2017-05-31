import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {AppState} from '../../../reducer'
import {fetchMenu} from '../actions'
import {MenuEntry, MenuItems, MenuState} from '../model'
import {Dispatch} from 'redux'
import {withRouter} from 'react-router'

const logo = require('images/logo.png')

interface MenuProps {
    source: string
}
class MenuDisplay extends React.Component<MenuProps & DispatchToProps & StateToProps, {}> {
    public componentWillMount() {
        this.props.fetchMenu()
    }

    // TODO cleanup child menu code (and possibly allow infinite nesting)
    public render() {
        const items = this.props.menu.items
        const byId = this.props.menu.byId
        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <button
                    className="navbar-toggler navbar-toggler-right"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                    <span style={{marginLeft: 10}}>Menu</span>
                </button>

                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="logo" style={{height: 40}}/>
                </Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {items && byId && items.map((item) => {
                            const info: MenuEntry = byId[item]
                            const children: MenuItems = info.children
                            if (children.length === 0) {
                                return (
                                    <li key={info.title} className="nav-item">
                                        <NavLink to={'/' + info.title.toLowerCase()} className="nav-link">
                                            {info.title}
                                        </NavLink>
                                    </li>
                                )
                            }

                            return (
                                <li key={info.title} className="nav-item dropdown">
                                    <div className="btn-group">
                                        <NavLink
                                            to={'/' + info.title.toLowerCase()}
                                            className="nav-link"
                                        >
                                            {info.title}
                                        </NavLink>
                                        <a
                                            className="nav-link dropdown-toggle dropdown-toggle-split"
                                            id="navbarDropdownMenuLink"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <span className="sr-only">Toggle Dropdown</span>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            {children.map((child) => {
                                                const childInfo: MenuEntry = byId[child]
                                                return (
                                                    <NavLink
                                                        to={'/' + info.title.toLowerCase() + '/' + childInfo.title.toLowerCase()}
                                                        className="nav-link dropdown-item"
                                                        key={childInfo.title}
                                                    >
                                                        {childInfo.title}
                                                    </NavLink>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </nav>
        )
    }
}

interface StateToProps {
    menu: MenuState
}
interface DispatchToProps {
    fetchMenu: () => void
}
export const Menu = withRouter<any>(connect<StateToProps, DispatchToProps, MenuProps>(
    (state: AppState, ownProps: MenuProps): StateToProps => ({
        menu: state.menus[ownProps.source] || {},
    }),
    (dispatch: Dispatch<any>, ownProps: MenuProps): DispatchToProps => ({
        fetchMenu: () => dispatch(fetchMenu(ownProps.source)),
    }),
)(MenuDisplay))
