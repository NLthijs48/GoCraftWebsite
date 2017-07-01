import * as React from 'react'

interface AbsoluteScrollerProps {
    children?: React.ReactNode
    style?: React.CSSProperties
}
export function AbsoluteScroller({children, style}: AbsoluteScrollerProps) {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                overflow: 'auto',
                ...style,
            }}
        >
            {children}
        </div>
    )
}
