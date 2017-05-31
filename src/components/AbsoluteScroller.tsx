import React from 'react'

interface AbsoluteScrollerProps {
    children: JSX.Element
}
export function AbsoluteScroller({children}: AbsoluteScrollerProps) {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: 'auto',
        }}>
            {children}
        </div>
    )
}
