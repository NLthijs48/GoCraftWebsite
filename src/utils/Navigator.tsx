import * as React from 'react'
import {NavLink} from 'react-router-dom'

interface NavigatorProps extends React.HTMLProps<HTMLDivElement> {
    to?: string
}
export class Navigator extends React.PureComponent<NavigatorProps, {}> {
    public render() {
        const {style, to, children} = this.props
        if(to) {
            return (
                <NavLink to={to} style={style}>
                    {children}
                </NavLink>
            )
        } else {
            return (
                <div style={style}>
                    {children}
                </div>
            )
        }
    }
}
