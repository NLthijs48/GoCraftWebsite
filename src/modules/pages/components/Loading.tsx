import CircularProgress from 'material-ui/CircularProgress'
import * as React from 'react'

interface LoadingProps {
    size?: number
}
export function Loading({size}: LoadingProps) {
    size = size || 50
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <CircularProgress size={size} thickness={Math.floor(size/10)} />
        </div>
    )
}
