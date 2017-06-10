import React from 'react'
import {UnixDate} from 'types'

export interface DateProps {
    at: UnixDate
    style?: React.CSSProperties
}
export function LocalDate({at, style}: DateProps) {
    return (
        <div style={{
            ...style,
        }}>
            {formatDate(at)}
        </div>
    )
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
function formatDate(dateNumber: UnixDate) {
    const date = new Date(dateNumber)
    return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()
}
