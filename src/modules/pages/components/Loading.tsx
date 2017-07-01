import * as React from 'react'

// TODO use a pretty loading indicator and animation
export function Loading() {
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
            <h1>loading...</h1>
        </div>
    )
}
