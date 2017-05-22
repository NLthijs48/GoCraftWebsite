import React from 'react'
import {Route, Switch} from 'react-router'
import {Home} from '../../pages/components/Home'
import {NotFound} from '../../pages/components/NotFound'
import {MenuRoutes} from './MenuRoutes'

export function Routes() {
    return (
        <div style={{flex: 1, position: 'relative'}}>
            <Switch>
                <Route key="/" exact path="/" component={Home}/>

                <MenuRoutes source="header-menu" />

                <Route component={NotFound}/>
            </Switch>
        </div>
    )
}
