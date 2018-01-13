import MaterialIcon from 'material-ui/Icon'
import * as React from 'react'

export interface IconProps  {
    name: string
    color?: string
    size?: number|string
    style?: React.CSSProperties
    fixedWidth?: boolean
    onClick?: () => void
}
export function Icon({name, color, size, style, fixedWidth, onClick}: IconProps) {
    // Deal with 'fa-home' and 'home' case
    if(name.substr(0, 3) !== 'fa-') {
        name = 'fa-' + name
    }

    const classes = ['fa', name]
    if(fixedWidth) {
        classes.push('fa-fw')
    }

    let fontSize = 'inherit'
    if(size && !isNaN(+size)) {
        fontSize = size+'px'
    } else if(size) {
        fontSize = size+''
    }

    return (
        <MaterialIcon
            className={classes.join(' ')}
            style={{
                fontSize,
                transition: 'none',
                ...style,
                color,
            }}
            aria-hidden="true"
            onClick={onClick}
        />
    )
}
