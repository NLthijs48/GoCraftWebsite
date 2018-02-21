import React, {HTMLProps} from 'react'
import {UnixDate} from 'types'

export interface DateProps extends HTMLProps<HTMLElement> {
    at: UnixDate
}
export function LocalDate({at, children, ...otherProps}: DateProps) {
    return (
        <div {...otherProps}>
            {formatDate(at)}
        </div>
    )
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
function formatDate(dateNumber: UnixDate) {
    const date = new Date(dateNumber)
    const year = date.getFullYear()
    return date.getDate() + ' ' + monthNames[date.getMonth()] + ((new Date()).getFullYear()===year ? '' : ' ' + year)
}
