import React from 'react'

export function NotFound() {
    return (
        <div className="container" style={{textAlign: 'center'}}>
            <div style={{fontSize: '30px', color: '#777', marginTop: '30px'}}>Page not found</div>
            <div style={{marginTop: '15px', color: '#555'}}>Try going to another page using the menu at the top</div>
        </div>
    )
}
