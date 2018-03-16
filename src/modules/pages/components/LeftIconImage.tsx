import * as React from 'react'

interface Props {
    image: string
    style?: React.CSSProperties
}
export function LeftIconImage({image, style}: Props) {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            width: 'auto',
            margin: '-20px 0 -20px 12px',
            ...style,
        }}>
            <div style={{
                backgroundImage: 'url('+image+')',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                width: 30,
                height: 30,
            }}/>
        </div>
    )
}
