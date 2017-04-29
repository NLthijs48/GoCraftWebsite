import React from 'react'
import {NavLink} from 'react-router-dom'

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
                </button>

                <a className="navbar-brand" href="/">
                    <img src="wrong" alt="logo" />
                </a>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link" >Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Shop</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Vote</a>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/map" className="nav-link">Map</NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Servers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Tickets</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Applications</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Media</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Staff</a>
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
