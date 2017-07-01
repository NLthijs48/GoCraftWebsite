import {ServerCard} from 'modules/servers/components/ServerCard'
import {ServerData, ServersState} from 'modules/servers/model'
import * as React from 'react'
import {ContentRect} from 'react-measure'
import {Responsive} from 'utils/Responsive'

interface ServersOverviewProps {
    servers: ServersState
    basePath: string
}
export class ServersOverview extends React.PureComponent<ServersOverviewProps, {columns: number}> {

    public constructor(props: ServersOverviewProps) {
        super(props)
        this.state = {columns: 1}
        this.onResize = this.onResize.bind(this)
    }

    public render() {
        const {servers, basePath} = this.props
        const {columns} = this.state
        const maxWidth = 100/Math.min(servers.data.length, columns) + '%'
        // [row][column]
        const renderLayout: ServerData[][] = []

        // Place servers on the grid
        for(let i=0; i<servers.data.length; i++) {
            // Calcuate the position this server should have
            const rowIndex = Math.floor(i/columns)
            const columnIndex = i%columns
            // Get the row
            const row = renderLayout[rowIndex] || []
            // Assign the server
            row[columnIndex] = servers.data[i]
            // Place row back
            renderLayout[rowIndex] = row
        }

        return (
            <Responsive onResize={this.onResize} style={{margin: '1.5em 0 0.5em 0'}}>
                {renderLayout.map((rowServers, rowIndex) => (
                    <div key={rowIndex} style={{
                        display: 'flex',
                        padding: '0 0.5em',
                        // justifyContent: 'center', // Align in the middle?
                    }}>
                        {rowServers.map((server, columnIndex) => (
                            <div key={columnIndex} style={{
                                maxWidth,
                                padding: '0.5em',
                                flex: 1,
                            }}>
                                <ServerCard server={server} path={basePath} />
                            </div>
                        ))}
                    </div>
                ))}
            </Responsive>
        )
    }

    private onResize(contentRect: ContentRect) {
        this.setState({columns: Math.max(1, Math.floor(contentRect.bounds.width/300))})
    }
}
