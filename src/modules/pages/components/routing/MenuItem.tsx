import {ListItem} from 'material-ui/List'
import React from 'react'
import {NavLink} from 'react-router-dom'

interface Props {
    children: React.ReactNode
    path: string
}

export function MenuItem({children, path}: Props) {
    return (
        <ListItem
            button
            style={{
                padding: 0, // Disable to let <NavLink cover the full area
            }}
        >
            <NavLink
                to={path}
                style={{
                    padding: '0.75em 1em',
                    width: '100%',
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                }}
                activeStyle={{color: '#000', backgroundColor: '#DDD'}}
            >
                {children}
            </NavLink>
        </ListItem>
    )
}