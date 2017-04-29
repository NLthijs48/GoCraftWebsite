import React from 'react'
import {ServerData} from './Servers'

interface ServerProps {
    server: ServerData
}
export default class Server extends React.Component<ServerProps, {}> {
    public render() {
        const server = this.props.server
        return (
            <div className="card" style={{margin: 10}}>
                {!server.image ? null :
                    <img className="card-img-top" src={server.image} alt="Server image"/>
                }
                <div className="card-block">
                    <h4 className="card-title">{server.name}</h4>
                    <p className="card-text">{server.shortDescription||'No description...'}</p>
                </div>
                <div className="card-footer">
                    <a href={'servers/' + server.slug} className="btn btn-primary btn-block">More information</a>
                </div>
            </div>
        )
    }
}
