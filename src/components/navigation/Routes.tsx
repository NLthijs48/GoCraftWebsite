import React from 'react'
import {Route} from 'react-router'
import BanList from '../pages/BanList'
import Home from '../pages/Home'
import Map from '../pages/Map'

export default function Routes() {
    return (
        <div style={{flex: 1, position: 'relative'}}>
            <Route key="/" exact path="/" component={HomeRoute}/>
            <Route key="/map" path="/map" component={MapRoute}/>
            <Route key="/bans" path="/bans" component={BanListRoute}/>
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
