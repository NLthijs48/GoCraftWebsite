import {RawContent} from 'components/RawContent'
import * as React from 'react'
import {CardItem} from 'utils/CardItem'
import {HTMLPage} from '../model'

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
        <div style={{
            maxWidth: 900,
            margin: '1em auto',
            padding: '1em',
        }}>
            <CardItem>
                {content}
            </CardItem>
        </div>
    )
}
