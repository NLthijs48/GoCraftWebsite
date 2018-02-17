import {PageHeader} from 'components/PageHeader'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import Tooltip from 'material-ui/Tooltip'
import {NewsList} from 'modules/news/components/NewsList'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Icon} from 'utils/Icon'

interface HomeProps {
    basePath: string
}
class HomeDisplay extends React.PureComponent<HomeProps & StateToProps &  RouteComponentProps<any>, {copied: boolean}> {

    public state = {copied: false}
    private resetT?: number

    public componentWillUnmount() {
        if(this.resetT) {
            window.clearTimeout(this.resetT)
        }
    }

    public render() {
        return (
            <PageHeader
                contentOnly={this.props.location.pathname !== '/'}
                primary="Welcome to our community!"
                secondary="Let's play together, join us now:"
                image={this.props.background}
                header={<React.Fragment>
                    <Tooltip title="Copy">
                        <Button variant="raised" color="primary" onClick={this.copyIP} >
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
            }>
                <NewsList basePath={this.props.basePath} />
            </PageHeader>
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

interface StateToProps {
    background?: string
}
export const Home = withRouter<HomeProps & RouteComponentProps<any>>(connect<StateToProps, {}, {}, AppState>(
    (state) => ({
        background: state.options.background,
    }),
)(HomeDisplay))
