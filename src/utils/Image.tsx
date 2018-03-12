import * as React from 'react'
import {Icon} from 'utils/Icon'

export interface ImageOption {
    url: string
    width: number
    height: number
}
export interface ImageInfo {
    options: ImageOption[] // Should be sorted by size, biggest first
}
interface Props {
    image: ImageInfo
    ratio?: number // Example: 16/9, more wide than high
    fit?: 'contain'|'cover'
    maxWidth?: number
    children?: React.ReactNode
    style?: React.CSSProperties
}
export function Image({ratio, children, image, fit, maxWidth, style}: Props) {
    fit = fit || 'cover'

    // Set ratio to biggest image if not already set
    if(!ratio && image.options[0]) {
        ratio = image.options[0].width / image.options[0].height
    }

    // Maximum expected display size
    maxWidth = maxWidth || image.options[0].width

    // TODO object-fit IE fallback necessary?
    // TODO -o- browser prefixing?

    return (
        <div style={{ // Ratio box cannot be inside a flex container, so wrap it to be sure
            width: '100%',
            ...style,
        }}>
            <div style={{
                width: '100%',
                height: '0',
                padding: ratio ? 1/ratio*100+'% 0 0 0' : '',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {image.options.length > 0 ? <img
                        src={image.options[0].url}
                        srcSet={image.options
                            .map((imageOption) => imageOption.url + ' ' + imageOption.width + 'w')
                            .join(', ')
                        }
                        sizes={'(max-width: '+maxWidth+'px) 100vw, '+maxWidth+'px'}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: fit,
                            objectPosition: 'center',
                        }}
                    /> : <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Icon name="picture-o" />
                    </div>}
                </div>

                {!!children && <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }}>
                    {children}
                </div>}
            </div>
        </div>
    )
}
