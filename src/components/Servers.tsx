import React from 'react'
import Server from './Server'

export default class Servers extends React.Component<{}, {}> {
    public render() {
        const servers = [
            {
                slug: 'survival',
                name: 'Survival',
                description: 'Build freely in the Epic world!',
            },
            {
                slug: 'kitpvp',
                name: 'Kit-PVP',
                description: 'Fight other and battle to be in the Top 10!',
            },
            {
                slug: 'factions',
                name: 'Factions',
                description: 'Battle with other teams for being the best faction!',
            },
            {
                slug: 'creative',
                name: 'Creative',
                description: 'Build whatever you want with all blocks at your disposal. WorldEdit can be used for easy world editing',
            },
        ]

        return (
            <div className="card-deck container" style={{marginTop: 10}}>
                {servers.map((server) =>
                    <Server
                        key={server.slug}
                        name={server.name}
                        description={server.description}
                        slug={server.slug}
                    />
                )}
            </div>
        )
    }
}
