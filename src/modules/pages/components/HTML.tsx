import React from 'react'
import {HTMLPage} from '../model'

interface HTMLProps {
    page: HTMLPage
}
export function HTML({page}: HTMLProps) {
    let content
    if(!page.content) {
        content = <div>Empty page content, add some in WordPress</div>
    } else {
        content = <div dangerouslySetInnerHTML={{__html: page.content}}/>
    }

    return (
        <div className="container">
            {content}
        </div>
    )
}
