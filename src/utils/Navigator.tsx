import * as React from 'react'
import {NavLink} from 'react-router-dom'

interface NavigatorProps extends React.HTMLProps<HTMLDivElement> {
    to?: string
    onPress?: () => void
    activeStyle?: React.CSSProperties
}
export class Navigator extends React.PureComponent<NavigatorProps, {}> {
    public render() {
        const {style, activeStyle, to, onPress, children} = this.props
        if(to && /^https?:\/\//.test(to)) {
            return (
                <a href={to} style={style} target="_blank" rel="noopener">
                    {children}
                </a>
            )
        } else if(to) {
            return (
                <NavLink to={to} style={style} activeStyle={activeStyle}>
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
}
