import React, {HTMLProps} from 'react'
import {UnixDate} from 'types'

export interface DateProps extends HTMLProps<HTMLElement> {
    at: UnixDate
}
export function LocalDate({at, ...props}: DateProps) {
    return (
        <div {...props}>
            {formatDate(at)}
        </div>
    )
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
function formatDate(dateNumber: UnixDate) {
    const date = new Date(dateNumber)
    return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()
}
