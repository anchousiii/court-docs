import React, { Component } from 'react'
import imgLoading from '../img/loading.gif'

export default class Participant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participant: {},
            lawsuit: {},
            document: {},
            schedule: {},
            loading: false
        };

    }
    componentDidMount(){
        const id = this.props.match.params.id;
        this.setState({
            loading: true
        })
        fetch('https://api.backendless.com/51755EE6-B7E8-95DE-FF49-2B7776E58C00/D98F4083-FE53-95A0-FFA1-C38959E80100/data/participant/'
            + id + '?loadRelations=lawsuit_id%2Clawsuit_id.document_id')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    participant: data,
                    lawsuit: data.lawsuit_id[0],
                    document: data.lawsuit_id[0].document_id[0]
                })
            )

    }

    render() {
        const {
            participant,
            lawsuit,
            document,
            schedule,
            loading
        } = this.state

        console.log(typeof lawsuit)
        console.log(lawsuit)/*
            .then(response => response.json())
            .then(data =>
                this.setState({
                    schedule: data,
                    loading: false
                })
            )*/

        return (loading)
            ? <div>Loading Participant...<img src={imgLoading} className="img-loading" alt="loading" /></div>
            : <div>
                <h4>Court Participant <b>{participant.name}</b></h4>
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <h4>Personal Info</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td>{participant.name}</td>
                                </tr>
                                <tr>
                                    <td><b>Role</b></td>
                                    <td>{participant.type}</td>
                                </tr>
                                <tr>
                                    <td><b>Address</b></td>
                                    <td>{participant.address}</td>
                                </tr>
                                <tr>
                                    <td><b>Phone</b></td>
                                    <td>{participant.phone}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h4>Lawsuit</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td><b>State</b></td>
                                    <td>{lawsuit.state}</td>
                                </tr>
                                <tr>
                                    <td><b>Type</b></td>
                                    <td>{lawsuit.type}</td>
                                </tr>
                                <tr>
                                    <td><b>Document</b></td>
                                    <td>{document.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <h4>Schedule</h4>
                        <table>
                            <tbody>
                            <tr>
                                <td><b>State</b></td>
                                <td>{schedule.type}</td>
                            </tr>
                            <tr>
                                <td><b>Type</b></td>
                                <td>{lawsuit.type}</td>
                            </tr>
                            <tr>
                                <td><b>Document</b></td>
                                <td>{document.name}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

    }

}