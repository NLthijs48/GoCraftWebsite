import * as React from 'react'
import {Icon} from 'utils/Icon'

export interface ImageOption {
    // Image type (jpeg, png, webp) to url
    url: {[key: string]: string|undefined}
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
    if(!image || !image.options || image.options.length === 0) {
        return null
    }
    fit = fit || 'cover'

    // Set ratio to biggest image if not already set
    const largest = image.options[0]
    if(!ratio) {
        ratio = largest.width / largest.height
    }

    // Maximum expected display size
    maxWidth = maxWidth || largest.width

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
                    {image.options.length > 0 ? <picture style={{
                        width: '100%',
                        height: '100%',
                        objectFit: fit,
                        objectPosition: 'center',
                    }}>
                        {['webp', 'jpeg', 'png'].map((imageType) => {
                            const imagesOfType = image.options.filter((imageOption) => !!(imageOption.url as any)[imageType])
                            if(imagesOfType.length === 0) {
                                return null
                            }
                            return <source
                                key={imageType}
                                type={'image/'+imageType}
                                srcSet={imagesOfType
                                    .map((imageOption) => imageOption.url[imageType] + ' ' + imageOption.width + 'w')
                                    .join(', ')
                                }
                                sizes={'(max-width: '+maxWidth+'px) 100vw, '+maxWidth+'px'}
                            />
                        })}
                        <img
                            src={largest.url.jpeg || largest.url.png}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: fit,
                                objectPosition: 'center',
                            }}
                        />
                    </picture> : <div style={{
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
