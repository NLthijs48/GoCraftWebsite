import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import Servers from './Servers'

export default class Site extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <NavBar/>
                <Servers/>
                <Footer/>
            </div>
        )
    }
}
