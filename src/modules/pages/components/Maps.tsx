import React from 'react'

// TODO render based on the Dynmap urls configured the servers
export function Maps() {
    return (
        <div style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
            <iframe
                className="d-flex"
                style={{width: '100%', height: '100%', border: '0 none'}}
                src="http://maps.go-craft.com"
            />
        </div>
    )
}
