import {WebsiteFrame} from 'components/WebsiteFrame'
import {Loading} from 'modules/pages/components/Loading'
import * as React from 'react'
import {connect} from 'react-redux'
import {AppState} from 'reducer'
import {VoteSitesState} from '../model'

interface VoteToolProps {
    basePath: string
}
type CombinedNewsListProps = VoteToolProps & StateToProps
class VoteTool extends React.PureComponent<CombinedNewsListProps, {}> {

    public constructor(props: CombinedNewsListProps) {
        super(props)
        this.state = {}
    }

    public render() {
        const {voteSites} = this.props
        if(voteSites.isFetching && (!voteSites.byId || !voteSites.items)) {
            return <Loading />
        }

        if(voteSites.items.length === 0) {
            return <div>No Vote sites</div>
        }

        // Determine tab that should be active
        const loadOrder: string[] = []
        if(voteSites.selected) {
            loadOrder.push(voteSites.selected)
        }
        loadOrder.push(...voteSites.items.filter((voteSiteID) => voteSites.byId[voteSiteID].canVote))
        loadOrder.push(...voteSites.items.filter((voteSiteID) => !voteSites.byId[voteSiteID].canVote))

        return (
            <div style={{
                width: '100%',
                height: '100%',
            }}>
                {voteSites.items.map((voteSiteId) => {
                    const voteSite = voteSites.byId[voteSiteId]

                    // Don't render tabs that are not active (prevent loading a bunch of external websites at once)
                    if(loadOrder.findIndex((value) => value===voteSiteId) > 2) {
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
                                zIndex: loadOrder[0]===voteSiteId ? 1 : 0,
                                opacity: loadOrder[0]===voteSiteId ? 1 : 0,
                            }}
                        >
                            <WebsiteFrame src={voteSite.vote_url} />
                        </div>
                    )
                })}
            </div>
        )
    }
}

interface StateToProps {
    voteSites: VoteSitesState
}
export const VotePage = connect<StateToProps, {}, VoteToolProps, AppState>(
    (state) => ({
        voteSites: state.voteSites,
    }),
)(VoteTool)
