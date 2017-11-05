import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import imgLoading from '../img/loading.gif'

export class AllParticipants extends Component{
    constructor(props){
        super(props);
        this.state = {
            participants: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        fetch('https://api.backendless.com/51755EE6-B7E8-95DE-FF49-2B7776E58C00/D98F4083-FE53-95A0-FFA1-C38959E80100/data/participant')
            .then(response => response.json())
            .then(json => json.map(participant => participant))
            .then(participants =>
                this.setState({
                    participants,
                    loading: false
                })
            )
    }

    render() {
        var countParticipants = 1;
        const {
            participants,
            loading
        } = this.state
        return (loading)
            ? <div>Loading Participants...<img src={imgLoading} className="img-loading" alt="loading" /></div>
            : (!participants.length)
                ? <div>No participants</div>
                : <div>
                    <h4>Court Participants</h4>
                    <h5>Click on the participant's name for more info</h5>
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Address</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            participants.map(function(x,i) {
                                return (
                                        <tr key={i}>
                                            <td>{countParticipants++}</td>
                                            <td><Link to={'/participants/' + x.objectId}>{x.name}</Link></td>
                                            <td>{x.type}</td>
                                            <td>{x.address}</td>
                                            <td>{x.phone}</td>
                                        </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
    }
}

export class Participant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participant: {},
            lawsuit: {},
            document: {},
            schedule: [],
            loading: false
        }
    }
    componentDidMount(){
        const participantId = this.props.match.params.id
        this.setState({
            loading: true
        })

            fetch('https://api.backendless.com/51755EE6-B7E8-95DE-FF49-2B7776E58C00/D98F4083-FE53-95A0-FFA1-C38959E80100/data/participant/'+
               participantId + '?loadRelations=schedule%2Clawsuit_id%2Clawsuit_id.document_id')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    participant: data,
                    lawsuit: data.lawsuit_id[0],
                    document: data.lawsuit_id[0].document_id[0],
                    schedule: data.schedule,
                    loading:false
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


        return (loading)
            ? <div>Loading Participant...<img src={imgLoading} className="img-loading" alt="loading" /></div>
            : <div>
                <div>{'<'} Back to <Link to='/participants'>all participants</Link></div>
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

                        <h4>Lawsuit <Link to={'/lawsuits/' + lawsuit.objectId}>#{lawsuit.number}</Link></h4>
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
                                <td><b>Date</b></td>
                                <td><b>Type</b></td>
                            </tr>
                            {
                                schedule.map(function(x,i) {
                                    var cDate = (new Date(x.process_date))
                                    var formatDate = cDate.toLocaleDateString('en-GB') +
                                        ' ' + cDate.getHours() + ':'
                                    cDate.getMinutes() == '0' ? formatDate = formatDate + '00' : formatDate = formatDate + cDate.getMinutes()
                                    return (
                                        <tr key={i}>
                                            <td>{formatDate}</td>
                                            <td>{x.type}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    }
}
