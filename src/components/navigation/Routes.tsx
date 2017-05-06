import React from 'react'
import {Route, Switch} from 'react-router'
import BanList from '../pages/BanList'
import Home from '../pages/Home'
import Map from '../pages/Map'
import NotFound from '../NotFound'

export default function Routes() {
    return (
        <div style={{flex: 1, position: 'relative'}}>
            <Switch>
                <Route key="/" exact path="/" component={HomeRoute}/>
                <Route key="/map" path="/map" component={MapRoute}/>
                <Route key="/bans" path="/bans" component={BanListRoute}/>

                <Route component={NotFound}/>
            </Switch>
        </div>
    )
}

const HomeRoute = () => (
    <Home/>
)
const MapRoute = () => (
    <Map/>
)
const BanListRoute = () => (
    <BanList/>
)
