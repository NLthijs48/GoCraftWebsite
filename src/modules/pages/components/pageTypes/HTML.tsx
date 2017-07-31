import {RawContent} from 'components/RawContent'
import * as React from 'react'
import {CardItem} from 'utils/CardItem'
import {HTMLPage} from '../../model'

interface HTMLProps {
    page: HTMLPage
}
export function HTML({page}: HTMLProps) {
    return (
        <div style={{
            maxWidth: 900,
            margin: '1em auto',
            padding: '1em',
        }}>
            <CardItem>
                {page.content ?
                    <RawContent content={page.content} /> :
                    <div>Empty page content, add some in WordPress</div>
                }
            </CardItem>
        </div>
    )
}
