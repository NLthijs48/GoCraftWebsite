import {WebsiteFrame} from 'components/WebsiteFrame'
import {Loading} from 'modules/pages/components/Loading'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Icon} from 'utils/Icon'
import {TimeDiff} from 'utils/TimeDiff'
import {VoteSitesState} from '../model'

interface VoteToolProps {
    basePath: string
}
type CombinedNewsListProps = VoteToolProps & StateToProps & RouteComponentProps<any>
class VoteTool extends React.PureComponent<CombinedNewsListProps, {selectedTab?: string}> {

    public constructor(props: CombinedNewsListProps) {
        super(props)
        this.state = {}
    }

    public render() {
        const {voteSites} = this.props
        const {selectedTab} = this.state

        if(voteSites.isFetching && (!voteSites.byId || !voteSites.items)) {
            return <Loading />
        }

        if(voteSites.items.length === 0) {
            return <div>No Vote sites</div>
        }

        // Find sites which still can be voted on
        const toVoteLookup: {[key: string]: true} = {}
        const toVoteArray: string[] = []
        const lastVotedLookup: {[key: string]: number} = {}
        const now = (new Date()).getTime()
        let afterSelected = null
        let foundSelected = false
        for(const voteSiteId of voteSites.items) {
            const voteSite = voteSites.byId[voteSiteId]
            let lastVoted = 0
            for(const identifier of voteSite.identifiers) {
                const siteStatus = voteSites.voteStatus[identifier]
                if(siteStatus) {
                    lastVoted = Math.max(lastVoted, siteStatus.lastVoted)
                }
            }
            lastVotedLookup[voteSiteId] = lastVoted

            const cooldown = voteSite.cooldown*60*60*1000
            if(lastVoted < (now-cooldown)) {
                toVoteLookup[voteSiteId] = true
                toVoteArray.push(voteSiteId)
            }

            if(voteSiteId===selectedTab) {
                foundSelected = true
            } else if(foundSelected && !afterSelected) {
                afterSelected = voteSiteId
            }
        }

        // Determine tab that should be active
        const tab = selectedTab || toVoteArray[0] || voteSites.items[0]
        const load = {
            [tab]: true,
            [toVoteArray[0]]: true,
            [toVoteArray[1]]: true,
            [afterSelected as any]: true,
        }
        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div className="overflow" style={{
                    height: '70px',
                    minHeight: '70px',
                    width: '100%',
                    display: 'flex',
                    backgroundColor: '#BBB',
                }}>
                    {voteSites.items.map((voteSiteId) => {
                        const voteSite = voteSites.byId[voteSiteId]
                        return (
                            <div
                                key={voteSiteId}
                                style={{
                                    backgroundColor: tab===voteSiteId ? 'green' : 'transparent',
                                    color: tab===voteSiteId ? 'white' : '#444',
                                    transition: 'background 100ms ease-in-out',
                                    padding: '20px 1em 0 1em',
                                    whiteSpace: 'nowrap',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                }}
                                onClick={() => this.setState({selectedTab: voteSiteId})}
                            >
                                {voteSite.name}
                                <div style={{
                                    fontSize: '70%',
                                }}>
                                    {!toVoteLookup[voteSiteId] ?
                                        <div>
                                            <Icon name="check" style={{marginRight: '0.5em'}}/>
                                            Voted <TimeDiff time={lastVotedLookup[voteSiteId]} />
                                        </div>
                                        : <div>
                                            Vote now!
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div style={{
                    flex: 1,
                    position: 'relative',
                }}>
                    {voteSites.items.map((voteSiteId) => {
                        const voteSite = voteSites.byId[voteSiteId]

                        // Don't render tabs that are not active (prevent loading a bunch of external websites at once)
                        if(!load[voteSiteId]) {
                            return null
                        }

                        return (
                            <div
                                key={voteSiteId}
                                style={{
                                    width: 'auto',
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    zIndex: tab===voteSiteId ? 1 : 0,
                                    opacity: tab===voteSiteId ? 1 : 0,
                                }}
                            >
                                <WebsiteFrame src={voteSite.vote_url} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

interface StateToProps {
    voteSites: VoteSitesState
}
export const VotePage = withRouter<any>(connect<StateToProps, {}, VoteToolProps>(
    (state: AppState): StateToProps => ({
        voteSites: state.voteSites,
    }),
)(VoteTool))
