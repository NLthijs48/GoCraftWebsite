import * as React from 'react'

type CardListProps = React.HTMLProps<HTMLDivElement>
export function CardList({children, style, ...otherProps}: CardListProps) {
    return (
        <div
            {...otherProps}
            style={{
                width: '100%',
                padding: '1em 1em 0 1em',
                display: 'block',
                maxWidth: '75em',
                margin: '0 auto',
                ...style,
            }}
        >
            {children}
        </div>
    )
}
