import {Location} from 'history'
import * as React from 'react'
import {match, RouteComponentProps, withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'

interface Props extends React.HTMLProps<HTMLDivElement> {
    to?: string
    onPress?: () => void
    activeStyle?: React.CSSProperties
}
class NavigateDisplay extends React.PureComponent<Props & RouteComponentProps<any>, {}> {
    public render() {
        const {style, activeStyle, to, onPress, children} = this.props
        if(to && /^[a-zA-Z]+:\/\//.test(to)) {
            return (
                <a href={to} style={style} target="_blank" rel="noopener">
                    {children}
                </a>
            )
        } else if(to) {
            return (
                <NavLink
                    to={to}
                    style={style as any}
                    exact={to==='/'}
                    activeStyle={activeStyle as any}
                    isActive={to==='/' ? this.isActive : undefined}
                    onClick={this.onClick}
                >
                    {children}
                </NavLink>
            )
        } else {
            return (
                <div style={style} onClick={onPress}>
                    {children}
                </div>
            )
        }
    }

    private onClick = (event: React.MouseEvent<HTMLElement>) => {
        if (event.metaKey || event.ctrlKey) {
            return
        }
        event.preventDefault()

        // Reload page if there is an update available
        if ((window as any).swUpdate) {
            return (window as any).location = this.props.to
        }

        // Just navigate to the page
        return this.props.history.push(this.props.to || '/')
    }

    private isActive(matched: match<any>, location: Location) {
        return location.pathname === '/' || location.pathname.startsWith('/news')
    }
}

export const Navigate = withRouter<Props & RouteComponentProps<any>>(NavigateDisplay)
