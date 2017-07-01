import {Loading} from 'modules/pages/components/Loading'
import {VoteSiteBlock} from 'modules/votesites/components/VoteSiteBlock'
import * as React from 'react'
import {ContentRect} from 'react-measure'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Responsive} from 'utils/Responsive'
import {VoteSite, VoteSitesState} from '../model'

interface NewsListProps {
    basePath: string
}
type CombinedNewsListProps = NewsListProps & StateToProps & RouteComponentProps<any>
class NewsListDisplay extends React.PureComponent<CombinedNewsListProps, {columns: number}> {

    public constructor(props: CombinedNewsListProps) {
        super(props)
        this.state = {columns: 1}
        this.onResize = this.onResize.bind(this)
    }

    public render() {
        const {columns} = this.state
        const {voteSites} = this.props

        if(voteSites.isFetching && (!voteSites.byId || !voteSites.items)) {
            return <Loading />
        }

        if(voteSites.items.length === 0) {
            return <div>No Vote sites</div>
        }

        const maxWidth = 100 / Math.min(voteSites.items.length, columns) + '%'
        // [row][column]
        const renderLayout: VoteSite[][] = []

        // Place vote sites on the grid
        for(let i = 0; i < voteSites.items.length; i++) {
            // Calcuate the position this server should have
            const rowIndex = Math.floor(i / columns)
            const columnIndex = i % columns
            // Get the row
            const row = renderLayout[rowIndex] || []
            // Assign the server
            row[columnIndex] = voteSites.byId[voteSites.items[i]]
            // Place row back
            renderLayout[rowIndex] = row
        }

        return (
            <Responsive onResize={this.onResize} style={{margin: '1.5em 0 0.5em 0'}}>
                {renderLayout.map((rowServers, rowIndex) => (
                    <div key={rowIndex} style={{
                        display: 'flex',
                        padding: '0 0.5em',
                    }}>
                        {rowServers.map((voteSite, columnIndex) => (
                            <div key={columnIndex} style={{
                                maxWidth,
                                padding: '0.5em',
                                flex: 1,
                            }}>
                                <VoteSiteBlock voteSite={voteSite} />
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

interface StateToProps {
    voteSites: VoteSitesState
}
export const VoteSitesList = withRouter<any>(connect<StateToProps, {}, NewsListProps>(
    (state: AppState): StateToProps => ({
        voteSites: state.voteSites,
    }),
)(NewsListDisplay))
