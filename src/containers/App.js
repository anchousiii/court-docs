import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import Home from '../components/Home'
import Documents from '../components/Documents'
import Participant from '../components/Participant'
import AllParticipants from '../components/AllParticipants'
import LawsuitsArchive from '../components/LawsuitsArchive'
import NotFound from '../components/NotFound'
import './App.css'

class Main extends Component {
    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component = {Home} />
                    <Route path='/documents' component = {Documents}/>
                    <Route exact path='/participants' component = {AllParticipants}/>
                    <Route path='/participants/:id' component = {Participant}/>
                    <Route path='/lawsuits-archive' component = {LawsuitsArchive}/>
                    <Route path='*' component = {NotFound}/>
                </Switch>
            </main>
        )
    }
}

class Header extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">

                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to='/' className="navbar-brand">Court Documentation</Link>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/documents'>Documents</Link></li>
                                <li><Link to='/participants'>Participants</Link></li>
                                <li><Link to='/lawsuits-archive'>Lawsuits Archive</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default class App extends Component {
    render(){
        return (
            <div>
                <Header />
                <Main />
            </div>
        )
    }
}

/*import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import Home from '../components/Home'
import Document from '../components/Document'
import Participant from '../components/Participant'
import LawsuitsArchive from '../components/LawsuitsArchive'
import NotFound from '../components/NotFound'
import './App.css';


class Main extends Component {
    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component = {Home} />
                    <Route path='/documents' component = {Document}/>
                    <Route path='/participants' component = {Participant}/>
                    <Route path='/lawsuits-archive' component = {LawsuitsArchive}/>
                    <Route path='*' component = {NotFound}/>
                </Switch>
            </main>
        )
    }
}

class Header extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">

                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to='/' className="navbar-brand">Court Documentation</Link>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/documents'>Documents</Link></li>
                                <li><Link to='/participants'>Participants</Link></li>
                                <li><Link to='/lawsuits-archive'>Lawsuits Archive</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default class App extends Component {
    render(){
        return (
            <div>
                <Header />
                <Main />
            </div>
        )
    }
}

*/