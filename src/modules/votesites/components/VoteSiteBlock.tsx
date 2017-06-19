import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import {RouteComponentProps, withRouter} from 'react-router'
import {CardItem} from 'utils/CardItem'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {VoteSite} from '../model'

interface VoteSiteBlockProps {
    voteSite: VoteSite
}
type CombinedVoteSiteBlockProps = VoteSiteBlockProps & RouteComponentProps<any>
export class NewsItemBlockDisplay extends React.PureComponent<CombinedVoteSiteBlockProps, {}> {

    public render() {
        const {voteSite} = this.props
        return (
            <CardItem style={{
                margin: 0,
            }} containerStyle={{flexDirection: 'column'}}>
                <h2>{voteSite.name}</h2>
                <Filler />
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                }}>
                    <a target="_blank" href={voteSite.vote_url}>
                        <RaisedButton
                            primary
                            label="Vote Now"
                            icon={<Icon name="thumbs-o-up"/>}
                        />
                    </a>
                </div>
            </CardItem>
        )
    }

}

export const VoteSiteBlock = withRouter<any>(NewsItemBlockDisplay)
