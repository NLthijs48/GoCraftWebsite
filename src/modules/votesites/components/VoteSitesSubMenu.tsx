import List, {ListItemText} from 'material-ui/List'
import {MenuItem} from 'modules/pages/components/routing/MenuItem'
import {VoteSitesState} from 'modules/votesites/model'
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
function VoteSitesSubMenuDisplay({voteSites, basePath, dispatch}: Props & StateToProps & RouteComponentProps<any> & DispatchProp<any>) {
    const active = voteSites.selected
        || voteSites.items.filter((voteSiteID) => voteSites.byId[voteSiteID].canVote)[0]
        || voteSites.items[0]
    return (
        <List style={{paddingTop: 0}}>
            {voteSites.items.map((voteSiteId) => {
                const voteSite = voteSites.byId[voteSiteId]
                const path = basePath + nameToPath(voteSite.name)
                return (
                    <MenuItem
                        key={path}
                        onPress={() => (dispatch as any)({type: 'voteSites/SELECT_SITE', site: voteSiteId})}
                        child
                        active={active===voteSiteId}
                    >
                        <div style={{paddingLeft: '2em'}}>
                            {voteSite.canVote && <Icon fixedWidth size={18} name="arrow-right" color="green"/>}
                            {!voteSite.canVote && !!voteSite.lastVoted && <Icon size={18} fixedWidth name="check"/>}
                        </div>
                        <ListItemText
                            primary={voteSite.name}
                            secondary={voteSite.canVote ? 'Vote now!' :
                                !!voteSite.lastVoted ? <span>Voted <TimeDiff time={voteSite.lastVoted} /></span> : null}
                        />
                    </MenuItem>
                )
            })}
        </List>
    )
}

interface StateToProps {
    voteSites: VoteSitesState
}
export const VoteSitesSubMenu = withRouter<Props & RouteComponentProps<any>>(connect<StateToProps, {}, Props, AppState>(
    (state) => ({
        voteSites: state.voteSites,
    }),
)(VoteSitesSubMenuDisplay))
