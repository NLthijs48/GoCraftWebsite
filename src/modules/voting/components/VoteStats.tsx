import {PageHeader} from 'components/PageHeader'
import Button from 'material-ui/Button'
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table'
import {Loading} from 'modules/pages/components/Loading'
import {Page} from 'modules/pages/model'
import {Player} from 'modules/players/components/Player'
import {getVoteSiteOrder, selectSite} from 'modules/voting/actions'
import {FETCH_TOP} from 'modules/voting/actionTypes'
import {rankingKey} from 'modules/voting/reducer'
import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {AppState} from 'reducer'
import {CardItem} from 'utils/CardItem'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {monthName} from 'utils/LocalDate'
import {Navigate} from 'utils/Navigate'
import {sendMessage} from 'websocket/websocket'
import {VoteRankingEntry, VotingState} from '../model'

interface Props {
    page: Page
}
interface State {
    year: number
    month: number
}
type AllProps = Props & StateToProps & DispatchProp<any>
class VoteStatsDisplay extends React.Component<AllProps, State> {

    public constructor(props: AllProps) {
        super(props)
        const date = new Date()
        const year = date.getUTCFullYear()
        const month = date.getUTCMonth() + 1
        this.state = {year, month}
    }

    public render() {
        if(!this.props.page.header) {
            return <Loading />
        }

        const canVote = this.props.voting.items
            .map((voteSiteId) => this.props.voting.byId[voteSiteId])
            .filter((voteSite) => voteSite.canVote)
            .length > 0
        const key = rankingKey(this.state.year, this.state.month)
        const ranking = this.props.voting.rankings[key]
        const entries = (ranking && ranking.entries && ranking.entries.length>0) ? ranking.entries : [1,2,3,4,5,6,7,8,9,10] as any as VoteRankingEntry[]
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
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '1em',
                    }}>
                        <h2>Vote Top 10 of {monthName(this.state.month)}{this.state.year===(new Date()).getUTCFullYear() ? '' : ' '+this.state.year}</h2>
                        <Filler />
                        <Button onClick={this.older}>
                            <Icon name="arrow-left" style={{marginRight: '1em'}} />
                            Older
                        </Button>
                        <Button onClick={this.newer} style={{marginLeft: '1em'}} disabled={this.state.month>=((new Date()).getUTCMonth()+1) && this.state.year >= (new Date()).getUTCFullYear()}>
                            Newer
                            <Icon name="arrow-right" style={{marginLeft: '1em'}} />
                        </Button>
                    </div>
                    <div style={{margin: '-1em'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell numeric padding="none">#</TableCell>
                                    <TableCell>Player</TableCell>
                                    <TableCell numeric>Votes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {entries.map((entry) => {
                                    if(typeof entry === 'number') {
                                        entry = {rank: entry, player: {game: 'minecraft', name: (ranking||{}).isFetching ? undefined : '-'}, votes: '-'} as any
                                    }
                                    return <TableRow hover key={entry.rank}>
                                        <TableCell numeric padding="none" style={{width: 40}}>{entry.rank}</TableCell>
                                        <TableCell><Player player={entry.player} placeholder="Loading..." /></TableCell>
                                        <TableCell numeric style={{width: 100}}>{entry.votes}</TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </div>
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

    private fetch = ({year, month}: State) => {
        const key = rankingKey(this.state.year, this.state.month)
        const ranking = this.props.voting.rankings[key]
        // Only fetch if ranking unavailable, or has not been updated after the month was over
        if(!ranking || (ranking.updated||0) < (new Date(ranking.year + (ranking.month===11 ? 1 : 0), (ranking.month+1)%12)).getTime()) {
            if(this.props.dispatch) {
                this.props.dispatch({type: FETCH_TOP, year, month})
                sendMessage({type: 'voteTop', year, month, start: 0, items: 10})
            }
        }
    }

    private newer = () => {
        const newState = {
            year: this.state.month>=12 ? this.state.year+1 : this.state.year,
            month: this.state.month>=12 ? 1 : this.state.month+1,
        }
        this.fetch(newState)
        this.setState(newState)
    }

    private older = () => {
        const newState = {
            year: this.state.month<=1 ? this.state.year-1 : this.state.year,
            month: this.state.month<=1 ? 12 : this.state.month-1,
        }
        this.fetch(newState)
        this.setState(newState)
    }
}

interface StateToProps {
    voting: VotingState
}
export const VoteStats = connect<StateToProps, {}, Props, AppState>(
    (state) => ({
        voting: state.voting,
    }),
)(VoteStatsDisplay as any)
