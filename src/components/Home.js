import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import imgLoading from '../img/loading.gif'

export class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            lawsuits: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        fetch('https://api.backendless.com/51755EE6-B7E8-95DE-FF49-2B7776E58C00/D98F4083-FE53-95A0-FFA1-C38959E80100/data/lawsuit?loadRelations=document_id')
            .then(response => response.json())
            .then(json => json.map(lawsuit => lawsuit))
            .then(lawsuits =>
                this.setState({
                    lawsuits,
                    loading: false
                })
            )

    }

    render(){
        const {
            lawsuits,
            loading
        } = this.state
        return (loading)
            ? <div>Loading Lawsuits...<img src={imgLoading} className="img-loading" alt="loading" /></div>
            : (!lawsuits.length)
                ? <div>No lawsuits</div>
                : <div>
                    <h4>Active Lawsuits</h4>
                    <h5>Click on the lawsuit's number for more info</h5>
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>State</th>
                            <th>Type</th>
                            <th>Document</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            lawsuits.map(function(x,i) {
                                    if (x.state!=='finished')
                                        return (
                                            <tr key={i}>
                                                <td><Link to={'/lawsuits/' + x.objectId}>{x.number}</Link></td>
                                                <td>{x.state}</td>
                                                <td>{x.type}</td>
                                                <td>{x.document_id[0].name}</td>
                                            </tr>
                                        );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
    }
}

export class NotFound extends Component {
    render() {
        return (
            <div>
                Page not found. Back to <Link to='/'>homepage</Link>
            </div>
        )
    }
}