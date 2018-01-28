import Button from 'material-ui/Button'
import ButtonBase from 'material-ui/ButtonBase'
import {NewsList} from 'modules/news/components/NewsList'
import * as React from 'react'
import {RouteComponentProps, withRouter} from 'react-router'
import {THEME} from 'types'
import {Icon} from 'utils/Icon'
import Timer = NodeJS.Timer

interface HomeProps {
    basePath: string
}
class HomeDisplay extends React.PureComponent<HomeProps & RouteComponentProps<any>, {copied: boolean}> {

    public state = {copied: false}
    private resetT: Timer

    public componentWillUnmount() {
        clearTimeout(this.resetT)
    }

    public render() {
        return (
            <div>
                {this.props.location.pathname === '/home' &&
                    <div>
                        <div style={{
                            backgroundColor: 'rgba(255,255,255,0.6)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '4em 1em 2em 1em',
                            textAlign: 'center',
                        }}>
                            <h1 style={{
                                color: THEME.palette.primary.main,
                            }}>
                                Welcome!
                            </h1>
                            <h2>
                                Let's play together, join us at:
                            </h2>
                            <ButtonBase focusRipple onClick={this.copyIP} style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: '0.5em',
                                fontSize: '150%',
                                paddingLeft: '0.5em',
                            }}>
                                <div style={{
                                    paddingRight: '0.5em',
                                }}>
                                    mc.go-craft.com
                                </div>
                                <Button raised dense color="primary" onClick={this.copyIP}>
                                    Copy
                                    <Icon name={this.state.copied ? 'check' : 'clone'} style={{marginLeft: '1em'}}/>
                                </Button>
                            </ButtonBase>
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
        this.resetT = setTimeout(() => this.setState({copied: false}), 5000)
    }
}

export const Home = withRouter<HomeProps & RouteComponentProps<any>>(HomeDisplay)
