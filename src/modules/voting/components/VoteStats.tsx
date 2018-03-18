import {PageHeader} from 'components/PageHeader'
import Button from 'material-ui/Button'
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table'
import {Loading} from 'modules/pages/components/Loading'
import {Page} from 'modules/pages/model'
import {Player} from 'modules/players/components/Player'
import {getVoteSiteOrder, selectSite} from 'modules/voting/actions'
import {rankingKey} from 'modules/voting/reducer'
import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {AppState} from 'reducer'
import {CardItem} from 'utils/CardItem'
import {Icon} from 'utils/Icon'
import {monthName} from 'utils/LocalDate'
import {Navigate} from 'utils/Navigate'
import {VotingState} from '../model'

interface Props {
    page: Page
}
class VoteStatsDisplay extends React.PureComponent<Props & StateToProps & DispatchProp<any>, {}> {

    public render() {
        if(!this.props.page.header) {
            return <Loading />
        }

        const canVote = this.props.voting.items
            .map((voteSiteId) => this.props.voting.byId[voteSiteId])
            .filter((voteSite) => voteSite.canVote)
            .length > 0
        const date = new Date()
        const year = date.getUTCFullYear()
        const month = date.getUTCMonth() + 1
        const key = rankingKey(year, month)
        const ranking = this.props.voting.rankings[key]
        return (
            <PageHeader
                primary={this.props.page.header.primary}
                secondary={this.props.page.header.secondary}
                image={this.props.page.header.image}
                header={<React.Fragment>
                    {canVote && <Navigate
                        onPress={this.voteNow}
                        style={{
                            marginTop: '2em',
                            display: 'block',
                        }}
                    >
                        <Button variant="raised" color="primary">
                            Start voting
                            <Icon name="arrow-right" style={{marginLeft: '1em'}}/>
                        </Button>
                    </Navigate>}
                </React.Fragment>
            }>
                <CardItem style={{maxWidth: 800, alignSelf: 'center'}}>
                    <h2>
                        Vote Top 10 of {monthName(month)}{year===(new Date()).getUTCFullYear() ? '' : ' '+year}
                    </h2>
                    {!ranking && <div>
                        No ranking available for this month...
                    </div>}
                    {!!ranking && <div style={{margin: '-1em'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell numeric padding="none">#</TableCell>
                                    <TableCell>Player</TableCell>
                                    <TableCell numeric>Votes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ranking.entries.map((entry) => <TableRow hover key={entry.rank}>
                                    <TableCell numeric padding="none">{entry.rank}</TableCell>
                                    <TableCell><Player player={entry.player} /></TableCell>
                                    <TableCell numeric>{entry.votes}</TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </div>}
                </CardItem>
            </PageHeader>
        )
    }

    private voteNow = () => {
        if(this.props.dispatch) {
            const siteOrder = getVoteSiteOrder(this.props.voting)
            this.props.dispatch(selectSite(siteOrder[0]))
        }
    }
}

interface StateToProps {
    voting: VotingState
}
export const VoteStats = connect<StateToProps, Props, {}, AppState>(
    (state) => ({
        voting: state.voting,
    }),
)(VoteStatsDisplay)
