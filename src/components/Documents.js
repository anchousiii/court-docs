import React, { Component } from 'react';

export default class Documents extends Component{
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
            ? <div>Loading Documents...</div>
            : (!documents.length)
                ? <div>No documents</div>
                : <div>
                    <h4>List of Documents</h4>
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
                                        <td>{x.name}</td>
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