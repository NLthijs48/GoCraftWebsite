import React from 'react'
import {NavLink} from 'react-router-dom'
import {CardItem} from 'utils/CardItem'
import {nameToPath} from 'utils/utils'
import {ServerData} from '../model'

interface ServerProps {
    server: ServerData
    path: string
}
export class Server extends React.PureComponent<ServerProps, {}> {
    public render() {
        const {server, path} = this.props
        return (
            <CardItem style={{
                height: '100%',
                padding: 0,
            }}>
                <NavLink
                    to={path+'/'+nameToPath(server.name)}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        color: 'inherit',
                    }}
                >
                    <div style={{
                        width: '100%',
                        padding: '56% 0 0 0',
                        backgroundImage: 'url(' + server.image + ')',
                        backgroundPosition: '50% 50%',
                        backgroundSize: 'cover',
                        position: 'relative',
                    }}>
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            left: 0,
                            background: 'rgba(0,0,0,0.5)',
                            color: '#FFF',
                            padding: '1em',
                        }}>
                            <div style={{
                                fontSize: '1.25em',
                            }}>
                                {server.name}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        padding: '1em',
                    }}>
                        {server.shortDescription}
                    </div>
                </NavLink>
            </CardItem>
        )
    }
}
