import * as React from 'react'
import {RouteComponentProps, withRouter} from 'react-router'
import {AnimateContainer} from 'utils/AnimateContainer'
import {Animate} from 'utils/Animation'
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
                <AnimateContainer style={{position: 'relative', width: '100%', height: '100%'}}>
                    <Animate
                        enter={{
                            from: {opacity: 0},
                            to: {opacity: 1},
                            time: 0.3,
                        }}
                        leave={{
                            from: {opacity: 1},
                            to: {opacity: 0},
                            time: 0.3,
                        }}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                        key={location.key}
                    >
                        <MenuRoutes location={location}/>
                    </Animate>
                </AnimateContainer>
            </div>
        )
    }
}

export const Routes = withRouter<any>(RoutesComponent)
