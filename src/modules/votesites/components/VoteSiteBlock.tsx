import Button from 'material-ui/Button'
import * as React from 'react'
import {RouteComponentProps, withRouter} from 'react-router'
import {CardItem} from 'utils/CardItem'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {VoteSite} from '../model'

interface Props {
    voteSite: VoteSite
}
function NewsItemBlockDisplay({voteSite}: Props & RouteComponentProps<any>) {
    return (
        <CardItem style={{
            margin: 0,
        }}>
            <h2>{voteSite.name}</h2>
            <Filler />
            <div style={{
                display: 'flex',
                alignItems: 'flex-end',
            }}>
                <a target="_blank" href={voteSite.vote_url}>
                    <Button raised>
                        <Icon name="thumbs-o-up"/>
                        Vote Now
                    </Button>
                </a>
            </div>
        </CardItem>
    )
}

export const VoteSiteBlock = withRouter<Props & RouteComponentProps<any>>(NewsItemBlockDisplay)
