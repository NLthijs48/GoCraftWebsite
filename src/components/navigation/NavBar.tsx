import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const logo = require('images/logo.png')

export default class NavBar extends React.Component<{}, {}> {
    public render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <button
                    className="navbar-toggler navbar-toggler-right"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                    <span style={{marginLeft: 10}}>Menu</span>
                </button>

                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="logo" style={{height: 40}}/>
                </Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link" >Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/shop" className="nav-link">Shop</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="vote">Vote</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/map" className="nav-link">Map</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="servers">Servers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="tickets">Tickets</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="applications">Applications</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="media">Media</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="staff">Staff</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/bans" className="nav-link">Ban list</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
