import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import {updateDrawerOpen} from 'modules/drawer/actions'
import {MenuItem} from 'modules/pages/components/routing/MenuItem'
import {selectSite, VOTE_INFO_KEY} from 'modules/voting/actions'
import {VotingState} from 'modules/voting/model'
import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Icon} from 'utils/Icon'
import {TimeDiff} from 'utils/TimeDiff'
import {nameToPath} from 'utils/utils'

interface Props {
    basePath: string
}
function VoteSitesSubMenuDisplay({voteSites, basePath, dispatch, goToSite}: Props & StateToProps & DispatchToProps & RouteComponentProps<any> & DispatchProp<any>) {
    return (
        <List style={{paddingTop: 0}}>
            <MenuItem
                key="info"
                onPress={() => goToSite(VOTE_INFO_KEY)}
                child
                active={voteSites.selected===VOTE_INFO_KEY}
            >
                <div style={{paddingLeft: '2em'}}>
                    <Icon fixedWidth size={18} name="trophy" />
                </div>
                <ListItemText
                    primary="Top 10"
                    secondary="Prices in 10 days"
                    style={{paddingRight: 0}}
                />
            </MenuItem>

            {voteSites.items.map((voteSiteId) => voteSites.byId[voteSiteId]).map((voteSite) => {
                const path = basePath + nameToPath(voteSite.name)
                return (
                    <MenuItem
                        key={path}
                        onPress={() => goToSite(voteSite.id)}
                        child
                        active={voteSites.selected===voteSite.id}
                    >
                        <div style={{paddingLeft: '2em'}}>
                            {voteSite.canVote && <Icon fixedWidth size={18} name="arrow-right" color="green"/>}
                            {!voteSite.canVote && !!voteSite.lastVoted && <Icon size={18} fixedWidth name="check"/>}
                        </div>
                        <ListItemText
                            primary={voteSite.name}
                            secondary={voteSite.canVote ? 'Vote now!' :
                                !!voteSite.lastVoted ? <span>Voted <TimeDiff time={voteSite.lastVoted} /></span> : null}
                            style={{paddingRight: 0}}
                        />
                    </MenuItem>
                )
            })}
        </List>
    )
}

interface StateToProps {
    voteSites: VotingState
}
interface DispatchToProps {
    goToSite: (voteSiteId: string) => void
}
export const VoteSitesSubMenu = withRouter<Props & RouteComponentProps<any>>(connect<StateToProps, DispatchToProps, Props, AppState>(
    (state) => ({
        voteSites: state.voting,
    }),
    (dispatch) => ({
        goToSite: (voteSiteId) => {
            dispatch(updateDrawerOpen(false))
            dispatch(selectSite(voteSiteId))
        },
    }),
)(VoteSitesSubMenuDisplay))
