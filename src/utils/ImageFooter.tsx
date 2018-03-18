import * as React from 'react'

interface Props {
    children?: React.ReactNode
    style?: React.CSSProperties
}
export function ImageFooter({children, style}: Props) {
    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            color: '#FFF',
        }}>
            <div style={{
                height: '5em',
                background: 'linear-gradient(' +
                    'to top,' +
                    'hsla(0, 0%, 0%, 0.5) 0%,' +
                    'hsla(0, 0%, 0%, 0.369) 19%,' +
                    'hsla(0, 0%, 0%, 0.2705) 34%,' +
                    'hsla(0, 0%, 0%, 0.191) 47%,' +
                    'hsla(0, 0%, 0%, 0.139) 56.5%,' +
                    'hsla(0, 0%, 0%, 0.097) 65%,' +
                    'hsla(0, 0%, 0%, 0.063) 73%,' +
                    'hsla(0, 0%, 0%, 0.0375) 80.2%,' +
                    'hsla(0, 0%, 0%, 0.021) 86.1%,' +
                    'hsla(0, 0%, 0%, 0.0105) 91%,' +
                    'hsla(0, 0%, 0%, 0.004) 95.2%,' +
                    'hsla(0, 0%, 0%, 0.001) 98.2%,' +
                    'hsla(0, 0%, 0%, 0) 100%' +
                ')',
            }}/>
            <div style={{
                background: 'linear-gradient(' +
                    'to top, ' +
                    'rgba(0,0,0,0.6) 0%, ' +
                    'rgba(0,0,0,0.6) 40%, ' +
                    'rgba(0,0,0,0.57) 70%, ' +
                    'rgba(0,0,0,0.55) 80%, ' +
                    'rgba(0,0,0,0.53) 90%, ' +
                    'rgba(0,0,0,0.5) 100% ' +
                ')',
                padding: '0 1em 1em 1em',
                ...style,
            }}>
                {children}
            </div>
        </div>
    )
}
