import React from 'react'

interface RawContent {
    content: string
    [k: string]: any
}
export function RawContent({content, ...otherProps}: RawContent) {
    return (
        <div {...otherProps} dangerouslySetInnerHTML={{__html: content}} />
    )
}
