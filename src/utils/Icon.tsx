import FontIcon from 'material-ui/FontIcon'
import React from 'react'

export interface IconProps {
    name: string
    color?: string
    style?: React.CSSProperties
}
export function Icon({name, color, style}: IconProps) {
    // Deal with 'fa-home' and 'home' case
    if(name.substr(0, 3) !== 'fa-') {
        name = 'fa-' + name
    }

    return (
        <FontIcon
            className={'fa fa-fw '+name}
            style={{
                ...style,
                color,
            }}
            aria-hidden="true"
        />
    )
}
