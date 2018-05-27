import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import * as React from 'react'
import {Icon} from 'utils/Icon'
import {Navigate} from 'utils/Navigate'

export class ArkJoinButton extends React.PureComponent<{short?: boolean}, {}> {

    public render() {
        return (
            <Tooltip title="Click to start ARK and join">
                <Navigate
                    style={{textDecoration: 'none'}}
                    to="steam://connect/ark.go-craft.com"
                >
                    <Button variant="raised" color="primary">
                        Join the {this.props.short ? '' : 'ARK '}server
                        <Icon name="sign-in" style={{marginLeft: '1em'}}/>
                    </Button>
                </Navigate>
            </Tooltip>
        )
    }
}
