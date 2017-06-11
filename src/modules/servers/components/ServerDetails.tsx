import {RawContent} from 'components/RawContent'
import React from 'react'
import {ServerData} from '../model'

interface ServerProps {
    server: ServerData
}
export class ServerDetails extends React.PureComponent<ServerProps, {}> {
    public render() {
        const server = this.props.server
        return (
            <div style={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: '1em',
            }}>
                <h1>{server.name}</h1>
                <div style={{display: 'flex'}}>
                    <div style={{
                        width: '30%',
                        height: '30%',
                        padding: '16% 0 0 0',
                        backgroundImage: 'url(' + server.image + ')',
                        backgroundPosition: '50% 50%',
                        backgroundSize: 'cover',
                        marginRight: '1em',
                        borderLeft: '1em solid #34B067',
                        flexShrink: 0,
                    }}/>

                    <div style={{
                        flex: 1,
                    }}>
                        <RawContent content={server.longDescription} />
                    </div>
                </div>
            </div>
        )
    }
}
