import FontIcon from 'material-ui/FontIcon'
import React from 'react'

export interface IconProps {
    name: string
    color?: string
    size?: number|string
    style?: React.CSSProperties
    fixedWidth?: boolean
}
export function Icon({name, color, size, style, fixedWidth}: IconProps) {
    // Deal with 'fa-home' and 'home' case
    if(name.substr(0, 3) !== 'fa-') {
        name = 'fa-' + name
    }

    const classes = ['fa', name]
    if(fixedWidth) {
        classes.push('fa-fw')
    }

    let fontSize = 'inherit'
    if(typeof size === 'number') {
        fontSize = size+'px'
    } else if(size) {
        fontSize = size
    }

    return (
        <FontIcon
            className={classes.join(' ')}
            style={{
                fontSize,
                ...style,
                color,
            }}
            aria-hidden="true"
        />
    )
}
