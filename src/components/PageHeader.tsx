import * as React from 'react'
import {Image, ImageInfo} from 'utils/Image'

interface Props {
    image?: ImageInfo
    primary?: React.ReactNode
    secondary?: React.ReactNode
    contentOnly?: boolean
    header?: React.ReactNode
    children: React.ReactNode
    contentStyle?: React.CSSProperties
    headerStyle?: React.CSSProperties
}
export function PageHeader({image, primary, secondary, children, header, contentOnly, contentStyle, headerStyle}: Props) {
    return (
        <React.Fragment>
            {!contentOnly && !!image && <Image image={image} style={{
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                height: '30em',
                width: '100%',
                zIndex: -1, // Don't go above header content
                overflow: 'hidden',
            }}>
                <div style={{ // Fade out the header image into the background
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    background: 'linear-gradient(to bottom, rgba(238,238,238,0) 0%, rgba(238,238,238,0) 60%, rgba(238,238,238,0.85) 80%, rgba(238,238,238,1) 100%)',
                }}/>
            </Image>}

            {!contentOnly && <div style={{
                margin: '0 auto',
                padding: '5em 1em 0em 1em',
                maxWidth: 1200,
                minHeight: '20em',
                color: '#FFF',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ...headerStyle,
            }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingBottom: '1em',
                }}>
                    <h1 style={{
                        fontSize: '3em',
                        textShadow: '3px 3px 1px rgba(10, 10, 10, 0.8)',
                        lineHeight: '100%',
                        marginBottom: 0,
                    }}>
                        {primary}
                    </h1>
                    <h2 style={{
                        textShadow: '2px 2px 0 rgba(10, 10, 10, 0.8)',
                        marginTop: '0.5em',
                        marginBottom: 0,
                    }}>
                        {secondary}
                    </h2>
                </div>

                {header}
            </div>}

            <div style={{
                margin: '0 auto',
                padding: '1em 1em 5em 1em',
                maxWidth: 1200,
                display: 'flex',
                flexDirection: 'column',
                ...contentStyle,
            }}>
                {children}
            </div>
        </React.Fragment>
    )
}
