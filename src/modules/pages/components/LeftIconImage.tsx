import * as React from 'react'

interface LoadingProps {
    image: string
}
export function LeftIconImage({image}: LoadingProps) {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            width: 'auto',
            margin: '-20px 0 -20px 12px',
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
