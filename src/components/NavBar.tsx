import React from 'react'

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

                <a className="navbar-brand" href="/">Navbar</a>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Shop</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Vote</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Map</a>
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
                            <a className="nav-link" href="#">Ban list</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
