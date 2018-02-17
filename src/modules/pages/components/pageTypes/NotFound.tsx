import * as React from 'react'

export function NotFound() {
    return (
        <div style={{textAlign: 'center', padding: '1em'}}>
            <h1 style={{
                color: '#555',
                marginTop: '30px',
            }}>
                Page not found
            </h1>

            <h2 style={{
                marginTop: '15px',
                color: '#999',
            }}>
                Try going to another page using the menu
            </h2>
        </div>
    )
}
