import {Tab, Tabs} from 'material-ui/Tabs'
import {Loading} from 'modules/pages/components/Loading'
import {ServersState} from 'modules/servers/model'
import React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
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

        let serversWithDynMap = 0

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
                contentContainerStyle={{flex: 1}}
                tabTemplateStyle={{height: '100%'}}
            >
                {servers.data.map((server) => {
                    if(!server.dynmapLink) {
                        return
                    }

                    serversWithDynMap++

                    return (
                        <Tab
                            label={server.name}
                            key={server.name}
                            value={nameToPath(server.name)}
                            style={{
                                paddingTop: '1em', // Room for the logo
                            }}
                        >
                            <iframe
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    height: '100%',
                                    border: '0 none',
                                }}
                                src={server.dynmapLink}
                            />
                        </Tab>
                    )
                })}

                {serversWithDynMap === 0 &&
                    <div style={{textAlign: 'center'}}>
                        <div style={{fontSize: '30px', color: '#777', marginTop: '30px'}}>There are not servers with DynMap...</div>
                        <div style={{marginTop: '15px', color: '#555'}}>Tell the admins it is time to setup some maps :)</div>
                    </div>
                }
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
