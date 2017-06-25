import {Tab, Tabs} from 'material-ui/Tabs'
import {Loading} from 'modules/pages/components/Loading'
import {ServersState} from 'modules/servers/model'
import React from 'react'
import {connect} from 'react-redux'
import {Redirect, RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {nameToPath} from 'utils/utils'

interface MapsProps {
    basePath: string
}
type AllMapsProps = MapsProps & StateToProps & RouteComponentProps<{one: string}>
class MapsDisplay extends React.PureComponent<AllMapsProps, {}> {
    public constructor(props: AllMapsProps) {
        super(props)
        this.switchToTab = this.switchToTab.bind(this)
    }

    public render() {
        const {servers} = this.props

        if(servers.isFetching && !servers.data.length) {
            return <Loading />
        }

        return (
            <Tabs
                value={this.props.match.params.one}
                onChange={this.switchToTab}
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                contentContainerStyle={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                }}
                tabTemplateStyle={{height: '100%'}}
                tabItemContainerStyle={{
                    height: 62, // 1em button padding + 48 button height
                    flexShrink: 0,
                }}
            >
                {servers.data.map((server, index) => {
                    if(!server.dynmapLink) {
                        return
                    }

                    return (
                        <Tab
                            label={server.name}
                            key={server.name}
                            value={nameToPath(server.slug)}
                            style={{
                                paddingTop: '1em', // Room for the logo
                            }}
                        >
                            {!this.props.match.params.one && index===1 &&
                                <Redirect to={this.props.basePath + '/' + nameToPath(server.slug)} />
                            }

                            {nameToPath(server.name) === this.props.match.params.one &&
                                <iframe
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        height: '100%',
                                        border: '0 none',
                                    }}
                                    src={server.dynmapLink}
                                />
                            }
                        </Tab>
                    )
                })}
            </Tabs>
        )
    }

    /**
     * Switch to a certain tab
     * @param value
     */
    private switchToTab(value: string) {
        this.props.history.push({pathname: this.props.basePath+'/'+value})
    }
}

interface StateToProps {
    servers: ServersState
}
export const Maps = withRouter<any>(connect<StateToProps, {}, {}>(
    (state: AppState): StateToProps => ({
        servers: state.servers,
    }),
)(MapsDisplay))
