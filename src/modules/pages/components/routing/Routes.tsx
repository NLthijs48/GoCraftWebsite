import * as React from 'react'
import {RouteComponentProps, withRouter} from 'react-router'
import {Fade} from 'utils/Fade'
import {MenuRoutes} from './MenuRoutes'

class RoutesComponent extends React.PureComponent<RouteComponentProps<any>, {}> {
    public render() {
        const {location} = this.props
        return (
            <div
                style={{
                    flex: 1,
                    position: 'relative',
                    backgroundColor: '#EEE',
                }}
            >
                <Fade id={location.pathname.split('/')[1]}>
                    <MenuRoutes location={location} />
                </Fade>
            </div>
        )
    }
}

export const Routes = withRouter<any>(RoutesComponent)
