import {getServerTypeIcon} from 'modules/servers/components/Servers'
import {ServersState} from 'modules/servers/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {AppState} from 'reducer'
import {THEME} from 'types'
import {Image} from 'utils/Image'
import {Navigate} from 'utils/Navigate'

interface Props {
    style?: React.CSSProperties
}
function ServersListRowDisplay({style, servers}: Props & StateToProps) {
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            ...style,
        }}>
            <div className="overflow" style={{
                flex: 1,
                display: 'flex',
                WebkitMaskImage: '-webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 2%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)',
                paddingLeft: '1.5em',
                paddingTop: '0.5em',
                paddingBottom: '0.5em', // Room for the scrollbar
                marginLeft: '-1.5em',
            }}>
                {servers.list.map((serverId) => servers.byId[serverId]).map((server) => <Navigate
                    to={'/servers/'+server.slug}
                    key={server.slug}
                    style={{
                        width: 160,
                        flexShrink: 0,
                        marginRight: '1em',
                        borderRadius: '2px',
                        overflow: 'hidden', // For the border radius
                        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
                        color: 'rgba(255,255,255,0.9)',
                        borderBottom: '0.2em solid ' + THEME.palette.primary.main,
                    }}
                >
                    <Image
                        image={server.image}
                        ratio={16/9}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                        }}>
                            <h2 style={{
                                textShadow: '1px 1px 1px rgba(10,10,10,0.8)',
                                opacity: 0.9,
                                lineHeight: '100%',
                                marginBottom: 0,
                                fontSize: '140%',
                            }}>
                                {server.name}
                            </h2>
                            <div style={{
                                backgroundImage: 'url('+getServerTypeIcon(server)+')',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                width: 50,
                                height: 50,
                                marginTop: '-0.5em',
                                marginBottom: '-0.5em',
                            }} />
                        </div>
                    </Image>
                </Navigate>)}
                <div style={{minWidth: '4em'}}/>
            </div>
        </div>
    )
}

interface StateToProps {
    servers: ServersState
}
export const ServersListRow = connect<StateToProps, {}, Props, AppState>(
    (state) => ({
        servers: state.servers,
    }),
)(ServersListRowDisplay)
