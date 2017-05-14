import React from 'react'
import {Route, Switch} from 'react-router'
import BanList from '../../../components/pages/BanList'
import Home from '../../../components/pages/Home'
import Map from '../../../components/pages/Map'
import NotFound from '../../../components/NotFound'

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
