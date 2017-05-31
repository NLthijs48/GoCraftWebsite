import React from 'react'
import {ServerData} from '../model'
import {NavLink} from 'react-router-dom'

interface ServerProps {
    server: ServerData
    path: string
}
export class Server extends React.Component<ServerProps, {}> {
    public render() {
        const {server, path} = this.props
        return (
            <NavLink
                to={path+'/'+server.name.toLowerCase()}
                style={{
                    width: '100%',
                    padding: '0.5em 1em',
                    display: 'block',
                    marginBottom: '2em',
                }}
            >
                <div style={{
                    display: 'flex',
                    maxWidth: 1200,
                    margin: '0 auto',
                }}>
                    <div style={{
                        width: '30%',
                        height: 'auto',
                        padding: '16% 0 0 0',
                        backgroundImage: 'url(' + server.image + ')',
                        backgroundPosition: '50% 50%',
                        backgroundSize: 'cover',
                        marginRight: '1em',
                        borderLeft: '1em solid #34B067',
                    }}/>

                    <div style={{
                        flex: 1,
                    }}>
                        <h4>{server.name}</h4>
                        <p>{server.shortDescription}</p>
                    </div>
                </div>
            </NavLink>
        )
    }
}
