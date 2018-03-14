import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import Tooltip from 'material-ui/Tooltip'
import * as React from 'react'
import {Icon} from 'utils/Icon'

export class MinecraftCopyButton extends React.PureComponent<{}, {copied: boolean}> {

    public state = {copied: false}
    private resetT?: number

    public componentWillUnmount() {
        if(this.resetT) {
            window.clearTimeout(this.resetT)
        }
    }

    public render() {
        return (
            <React.Fragment>
                <Tooltip title="Click to copy">
                    <Button variant="raised" color="primary" onClick={this.copyIP}>
                        mc.go-craft.com
                        <Icon name={this.state.copied ? 'check' : 'clone'} style={{marginLeft: '1em'}}/>
                    </Button>
                </Tooltip>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    open={this.state.copied}
                    message={<span>IP copied, you can paste it in Minecraft now</span>}
                />
            </React.Fragment>
        )
    }

    private copyIP = () => {
        const e = document.createElement('textarea')
        document.body.appendChild(e)
        e.style.cssText = 'position:absolute; left:-999px; top:-999px;'
        e.innerText = 'mc.go-craft.com'
        e.focus()
        e.select()
        document.execCommand('copy')
        document.body.removeChild(e)
        this.setState({copied: true})
        this.resetT = window.setTimeout(() => this.setState({copied: false}), 5000)
    }
}
