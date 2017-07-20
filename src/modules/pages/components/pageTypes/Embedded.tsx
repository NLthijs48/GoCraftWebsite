import {WebsiteFrame} from 'components/WebsiteFrame'
import * as React from 'react'
import {EmbeddedPage} from '../../model'

interface EmbeddedProps {
    page: EmbeddedPage
}
export function Embedded({page}: EmbeddedProps) {
    return <WebsiteFrame src={page.url} />
}
