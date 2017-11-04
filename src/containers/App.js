import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { Home, NotFound }  from '../components/Home'
import { AllDocuments, Document } from '../components/Documents'
import { AllParticipants, Participant } from '../components/Participants'
import { LawsuitsArchive, Lawsuit } from '../components/Lawsuits'
import './App.css'

class Main extends Component {
    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component = {Home} />
                    <Route exact path='/documents' component = {AllDocuments}/>
                    <Route exact path='/documents/:id' component = {Document}/>
                    <Route exact path='/participants' component = {AllParticipants}/>
                    <Route path='/participants/:id' component = {Participant}/>
                    <Route path='/lawsuits-archive' component = {LawsuitsArchive}/>
                    <Route path='/lawsuits/:id' component = {Lawsuit}/>
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
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to='/' className="navbar-brand">Court Documentation</Link>
                        </div>

                        <div className="collapse navbar-collapse" id="navbar-collapse">
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