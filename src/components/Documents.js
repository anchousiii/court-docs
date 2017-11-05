import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import imgLoading from '../img/loading.gif'


export class AllDocuments extends Component{
    constructor(props){
        super(props);
        this.state = {
            documents: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        fetch('https://api.backendless.com/51755EE6-B7E8-95DE-FF49-2B7776E58C00/D98F4083-FE53-95A0-FFA1-C38959E80100/data/document?loadRelations=base')
            .then(response => response.json())
            .then(json => json.map(document => document))
            .then(documents =>
                this.setState({
                    documents,
                    loading: false
                })
            )
    }

    render() {
        var countDocuments = 1;
        const {
            documents,
            loading
        } = this.state
        return (loading)
            ? <div>Loading Documents...<img src={imgLoading} className="img-loading" alt="loading" /></div>
            : (!documents.length)
                ? <div>No documents</div>
                : <div>
                    <h4>List of Documents</h4>
                    <h5>Click on the document's name for more info</h5>
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Base</th>
                        </tr>
                        </thead>
                        <tbody>
                        {

                            documents.map(function(x,i) {
                                return (
                                    <tr key={i}>
                                        <td>{countDocuments++}</td>
                                        <td><Link to={'/documents/' + x.objectId}>{x.name}</Link></td>
                                        <td>{x.type}</td>
                                        <td>{ (x.base.length===0) ? 'Base Document Itself' : x.base[0].name }</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
    }
}

export class Document extends Component {
    constructor(props) {
        super(props);
        this.state = {
            document: {},
            base: {},
            loading: false
        };

    }
    componentDidMount(){
        const id = this.props.match.params.id;
        this.setState({
            loading: true
        })
        fetch('https://api.backendless.com/51755EE6-B7E8-95DE-FF49-2B7776E58C00/D98F4083-FE53-95A0-FFA1-C38959E80100/data/document/'
            + id + '?loadRelations=base')

            .then(response => response.json())
            .then(data =>
                this.setState({
                    document: data,
                    base: data.base[0],
                    loading: false
                })

            )
    }

    render() {
        const {
            document,
            base,
            loading
        } = this.state
        return (loading)
            ? <div>Loading Document...<img src={imgLoading} className="img-loading" alt="loading" /></div>
            : <div>
                <h4>Court Document <b>{document.name}</b></h4>
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <h4>Document Info</h4>
                        <table>
                            <tbody>
                            <tr>
                                <td><b>Name</b></td>
                                <td>{document.name}</td>
                            </tr>
                            <tr>
                                <td><b>Type</b></td>
                                <td>{document.type}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <h4>Base Document</h4>
                        {
                            (!base) ? <h5>Base Document Itself</h5> :
                            <table>
                                <tbody>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td>{base.name}</td>
                                </tr>
                                <tr>
                                    <td><b>Type</b></td>
                                    <td>{base.type}</td>
                                </tr>

                                </tbody>
                            </table> }
                    </div>
                </div>
            </div>
    }
}