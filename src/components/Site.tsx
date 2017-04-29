import React from 'react'
import {
    BrowserRouter as Router,
} from 'react-router-dom'
import NavBar from './navigation/NavBar'
import Routes from './navigation/Routes'

export default function Site() {
    return (
        <Router>
            <div className="d-flex flex-column" style={{minHeight: '100%'}}>
                <NavBar/>
                <Routes/>
            </div>
        </Router>
    )
}
