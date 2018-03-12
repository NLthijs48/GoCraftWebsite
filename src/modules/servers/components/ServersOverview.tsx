import {PageHeader} from 'components/PageHeader'
import {Loading} from 'modules/pages/components/Loading'
import {Page} from 'modules/pages/model'
import {ServerCard} from 'modules/servers/components/ServerCard'
import {ServersState} from 'modules/servers/model'
import * as React from 'react'
import {ContentRect} from 'react-measure'
import {Responsive} from 'utils/Responsive'

interface ServersOverviewProps {
    servers: ServersState
    basePath: string
    page: Page
}
export class ServersOverview extends React.PureComponent<ServersOverviewProps, {columns: number}> {

    public constructor(props: ServersOverviewProps) {
        super(props)
        this.state = {columns: 0}
        this.onResize = this.onResize.bind(this)
    }

    public render() {
        const {servers, basePath, page} = this.props
        const {columns} = this.state

        if(!page.header) {
            return <Loading/>
        }

        const maxWidth = 100 / columns + '%'
        // [row][column]
        const renderLayout: number[][] = []

        // Place servers on the grid
        for(let i=0; i<servers.list.length; i++) {
            // Calcuate the position this server should have
            const rowIndex = Math.floor(i/columns)
            const columnIndex = i%columns
            // Get the row
            const row = renderLayout[rowIndex] || []
            // Assign the server
            row[columnIndex] = servers.list[i]
            // Place row back
            renderLayout[rowIndex] = row
        }

        return (
            <PageHeader
                image={page.header.image}
                primary={page.header.primary}
                secondary={page.header.secondary}
            >
                <Responsive onResize={this.onResize} style={{margin: '1.5em 0 0.5em 0'}}>
                    {!columns ? null :
                        renderLayout.map((rowServers, rowIndex) => (
                            <div key={rowIndex} style={{
                                display: 'flex',
                            }}>
                                {rowServers.map((serverId, columnIndex) => (
                                    <div key={columnIndex} style={{
                                        maxWidth,
                                        padding: '0.5em',
                                        flex: 1,
                                    }}>
                                        <ServerCard server={servers.byId[serverId]} path={basePath}/>
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                </Responsive>
            </PageHeader>
        )
    }

    private onResize(contentRect: ContentRect) {
        this.setState({columns: Math.max(1, Math.floor(contentRect.bounds.width/400))})
    }
}
