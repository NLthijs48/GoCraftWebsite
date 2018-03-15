import React, {HTMLProps} from 'react'
import {UnixDate} from 'types'

export interface DateProps extends HTMLProps<HTMLElement> {
    at: UnixDate
    full?: boolean
}
export function LocalDate({at, children, full, ...otherProps}: DateProps) {
    return (
        <div {...otherProps}>
            {formatDate(at, full)}
        </div>
    )
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// Month starting at 1
export function monthName(month: number) {
    return monthNames[month-1]
}
function formatDate(dateNumber: UnixDate, full?: boolean) {
    const date = new Date(dateNumber)
    const year = date.getFullYear()
    return date.getDate() + ' ' + monthNames[date.getMonth()] + ((new Date()).getFullYear()===year && !full ? '' : ' ' + year)
}
