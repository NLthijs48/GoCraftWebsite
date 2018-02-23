import {WebsiteFrame} from 'components/WebsiteFrame'
import {Loading} from 'modules/pages/components/Loading'
import {Page} from 'modules/pages/model'
import {getVoteSiteOrder, VOTE_INFO_KEY} from 'modules/voting/actions'
import {VoteStats} from 'modules/voting/components/VoteStats'
import * as React from 'react'
import {connect} from 'react-redux'
import {AppState} from 'reducer'
import {VotingState} from '../model'

interface Props {
    basePath: string
    page: Page
}
class VoteTool extends React.PureComponent<Props & StateToProps, {}> {

    private loaded: {[key: string]: boolean} = {}

    public componentWillUnmount() {
        // Reset loaded, iframes are destroyed
        this.loaded = {}
    }

    public render() {
        const {voting} = this.props
        if(voting.isFetching && (!Object.keys(voting.byId) || !voting.items)) {
            return <Loading />
        }

        if(!voting.items) {
            return <div>No Vote sites</div>
        }

        // Determine tab that should be active
        const loadOrder: string[] = getVoteSiteOrder(voting, true)

        return (
            <div style={{
                width: '100%',
                height: '100%',
            }}>
                {[VOTE_INFO_KEY].concat(voting.items).map((voteSiteId) => {
                    // Don't render tabs that are not active (prevent loading a bunch of external websites at once)
                    if(!this.loaded[voteSiteId] && loadOrder.findIndex((value) => value===voteSiteId) >= 2) {
                        return null
                    }
                    this.loaded[voteSiteId] = true

                    const voteSite = voting.byId[voteSiteId]
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
                                transition: 'opacity 300ms ease-in-out',
                            }}
                        >
                            {voteSiteId===VOTE_INFO_KEY ?
                                <VoteStats page={this.props.page} /> :
                                <WebsiteFrame src={voteSite.vote_url} />
                            }
                        </div>
                    )
                })}
            </div>
        )
    }
}

interface StateToProps {
    voting: VotingState
}
export const VotePage = connect<StateToProps, Props, {}, AppState>(
    (state) => ({
        voting: state.voting,
    }),
)(VoteTool)
