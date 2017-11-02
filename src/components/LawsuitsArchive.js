import React, { Component } from 'react';

export default class LawsuitsArchive extends Component {
    constructor(props){
        super(props);
        this.state = {
            lawsuits: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
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

    render() {
        var countLawsuits = 1;
        const {
            lawsuits,
            loading
        } = this.state
        return (loading)
            ? <div>Loading Lawsuits...</div>
            : (!lawsuits.length)
                ? <div>No lawsuits</div>
                : <div>
                    <h4>Finished Lawsuits</h4>
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
                                    if (x.state==='finished')
                                        return (
                                            <tr key={i}>
                                                <td>{countLawsuits++}</td>
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
