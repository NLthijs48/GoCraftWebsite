import React from 'react'
import Server from './Server'
import axios from '../../node_modules/axios/dist/axios.js'
import {get} from './utils'

// Information about a server
export interface ServerData {
    slug: string
    name: string
    shortDescription: string
    longDescription: string
    image: string
}
export default class Servers extends React.Component<{}, {servers: ServerData[]}> {
    private restEndpoint = 'http://mc.go-craft.com/wordpress/wp-json/wp/v2'

    public constructor(props: any) {
        super(props)
        this.state = {servers: []}
        this.api('/servers').then((response: object[]) => {
            console.log('got servers:', response)
            const servers = []
            for(const rawServer of response) {
                const slug = get(rawServer, 'slug')
                if(typeof slug !== 'string') {
                    console.log('Server has no slug:', rawServer)
                    continue
                }
                servers.push({
                    slug,
                    name: get(rawServer, 'title', 'rendered'),
                    shortDescription: get(rawServer, 'acf', 'description'),
                    longDescription: get(rawServer, 'acf', 'details'),
                    image: get(rawServer, 'acf', 'feature_image', 'sizes', 'medium'),
                })
            }
            console.log('server result:', servers)
            this.setState({servers})
        }).catch((error) => {
            console.log('fetching servers failed:', error)
        })
    }

    public render() {
        return (
            <div className="card-deck container" style={{marginTop: 10}}>
                {this.state.servers.map((server) => <Server key={server.slug} server={server} />)}
            </div>
        )
    }

    private api(endPoint: string) {
        return new Promise((resolve, reject) => {
            axios.get(this.restEndpoint + endPoint).then((response: any) => {
                resolve(response.data)
            }).catch((error: any) => {
                reject(error)
            })
        })
    }
}
