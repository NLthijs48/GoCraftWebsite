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
    private resetT: number

    public componentWillUnmount() {
        window.clearTimeout(this.resetT)
    }

    public render() {
        return (
            <div style={{position: 'relative', height: '100%'}}>
                {this.props.location.pathname === '/home' &&
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '4em 1em 2em 1em',
                        textAlign: 'center',
                        minHeight: '35%',
                        color: '#FFF',
                        position: 'relative',
                        paddingBottom: '8em',
                        marginBottom: '-3em',
                    }}>
                        <div style={{
                            backgroundColor: 'rgba(255,255,255,0.6)',
                            backgroundImage: 'url(' + this.props.background + ')',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            position: 'absolute',
                            top: -10,
                            right: -10,
                            bottom: 0,
                            left: -10,
                            WebkitMaskImage: '-webkit-linear-gradient(top, #000 0%, #000 60%, #0003 80%, #0000 100%)',
                        }}/>

                        <div style={{
                            zIndex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                            <h1 style={{
                                fontSize: '3em',
                                textShadow: '4px 2px 1px rgba(10, 10, 10, 0.8)',
                                lineHeight: '100%',
                            }}>
                                Welcome to our community!
                            </h1>

                            <h2 style={{
                                textShadow: '3px 2px rgba(10, 10, 10, 0.8)',
                            }}>
                                Let's play together, join us now:
                            </h2>

                            <Tooltip title="Copy">
                                <Button raised color="primary" onClick={this.copyIP} >
                                    mc.go-craft.com
                                    <Icon name={this.state.copied ? 'check' : 'clone'} style={{marginLeft: '1em'}}/>
                                </Button>
                            </Tooltip>
                            <Snackbar
                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                open={this.state.copied}
                                message={<span>IP copied, you can paste it in Minecraft now</span>}
                            />
                        </div>
                    </div>
                }

                <NewsList basePath={this.props.basePath} />
            </div>
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
