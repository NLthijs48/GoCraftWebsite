import React from 'react'
import {
    BrowserRouter as Router,
} from 'react-router-dom'
import Routes from '../modules/routing/components/Routes'
import Menu from '../modules/routing/components/Menu'

export default function Site() {
    return (
        <Router>
            <div className="d-flex flex-column" style={{minHeight: '100%'}}>
                <Menu source="header-menu"/>
                <Routes/>
            </div>
        </Router>
    )
}
