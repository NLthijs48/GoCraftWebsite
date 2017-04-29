import React from 'react'

interface ServerProps {
    slug: string
    name: string
    description: string
}
export default class Server extends React.Component<ServerProps, {}> {
    public render() {
        return (
            <div className="card" style={{margin: 10}}>
                <img className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-block">
                    <h4 className="card-title">{this.props.name}</h4>
                    <p className="card-text">{this.props.description}</p>
                </div>
                <div className="card-footer">
                    <a href={'servers/' + this.props.slug} className="btn btn-primary btn-block">More information</a>
                </div>
            </div>
        )
    }
}
