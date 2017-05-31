import React from 'react'
import {HTMLPage} from '../model'
import {RawContent} from '../../../components/RawContent'

interface HTMLProps {
    page: HTMLPage
}
export function HTML({page}: HTMLProps) {
    let content
    if(!page.content) {
        content = <div>Empty page content, add some in WordPress</div>
    } else {
        content = <RawContent content={page.content} />
    }

    return (
        <div className="container">
            {content}
        </div>
    )
}
