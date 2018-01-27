import {ListItem} from 'material-ui/List'
import React from 'react'
import {Navigator} from 'utils/Navigator'

interface Props {
    children: React.ReactNode
    path?: string
    child?: boolean
    onPress?: () => void
    active?: boolean
}
export function MenuItem({children, path, child, onPress, active}: Props) {
    return (
        <ListItem
            button
            style={{
                padding: 0, // Disable to let <NavLink cover the full area
            }}
        >
            <Navigator to={path} onPress={onPress} style={{
                    padding: '0.5em 1em',
                    width: '100%',
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    minHeight: child ? 'auto' : '50px',
                    backgroundColor: active ? (child ? '#EEE' : '#DDD') : undefined,
                }}
                activeStyle={{backgroundColor: child ? '#EEE' : '#DDD'}}
            >
                {children}
            </Navigator>
        </ListItem>
    )
}
