import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import imgLoading from '../img/loading.gif'


export class LawsuitsArchive extends Component {
    constructor(props){
        super(props);
        this.state = {
            lawsuits: [],
            loading: false,
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

    render() {
        const {
            lawsuits,
            loading
        } = this.state
        return (loading)
            ? <div>Loading Lawsuits...<img src={imgLoading} className="img-loading" alt="loading" /></div>
            : (!lawsuits.length)
                ? <div>No lawsuits</div>
                : <div>
                    <h4>All Lawsuits</h4>
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
                            lawsuits.map((x,i) =>
                                <tr key={i}>
                                    <td><Link to={'/lawsuits/' + x.objectId}>{x.number}</Link></td>
                                    <td>{x.state}</td>
                                    <td>{x.type}</td>
                                    <td>{x.document_id[0].name}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
    }
}


export class Lawsuit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lawsuit: {},
            participants: [],
            schedule: [],
            loading: false
        };
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.setState({
            loading: true
        })
        fetch('https://api.backendless.com/51755EE6-B7E8-95DE-FF49-2B7776E58C00/D98F4083-FE53-95A0-FFA1-C38959E80100/data/lawsuit/' + id)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    lawsuit: data
                })
            )

        fetch('https://api.backendless.com/51755EE6-B7E8-95DE-FF49-2B7776E58C00/D98F4083-FE53-95A0-FFA1-C38959E80100/data/participant?where=lawsuit_id.objectId%20%3D%20'
            + id + '&loadRelations=lawsuit_id')
            .then(response => response.json())
            .then(json => json.map(participant => participant))
            .then(participants =>
                this.setState({
                    participants
                })
            )

        fetch('https://api.backendless.com/51755EE6-B7E8-95DE-FF49-2B7776E58C00/D98F4083-FE53-95A0-FFA1-C38959E80100/data/schedule?where=lawsuit_id%3D' + id)
            .then(response => response.json())
            .then(json => json.map(sched => sched))
            .then(schedule =>
                this.setState({
                    schedule,
                    loading: false
                })
            )
    }

    render() {
        const {
            lawsuit,
            participants,
            schedule,
            loading
        } = this.state
        return (loading)
            ? <div>Loading Lawsuit...<img src={imgLoading} className="img-loading" alt="loading" /></div>
            : <div>
                <div> {'<'} Back to <Link to='/lawsuits-archive'>all lawsuits</Link></div>
                <h4>Lawsuit <b>#{lawsuit.number}</b></h4>
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <h4>Lawsuit Info</h4>
                        <table>
                            <tbody>
                            <tr>
                                <td><b>#</b></td>
                                <td>{lawsuit.number}</td>
                            </tr>
                            <tr>
                                <td><b>State</b></td>
                                <td>{lawsuit.state}</td>
                            </tr>
                            <tr>
                                <td><b>Type</b></td>
                                <td>{lawsuit.type}</td>
                            </tr>
                            </tbody>
                        </table>
                        <h4>Participants</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td><b>Judge</b></td>
                                    {
                                        participants.map(function(x,i) {
                                            if (x.type === 'judge')
                                                return <td key={i}> <Link to={'/participants/' + x.objectId}>{x.name}</Link></td>
                                        })
                                    }
                                </tr>
                                <tr>
                                    <td><b>Claimant</b></td>
                                    {
                                        participants.map(function(x,i) {
                                            if (x.type === 'claimant')
                                                return <td key={i}> <Link to={'/participants/' + x.objectId}>{x.name}</Link></td>
                                        })
                                    }
                                </tr>
                                <tr>
                                    <td><b>Respondent</b></td>
                                    {
                                        participants.map(function(x,i) {
                                            if (x.type === 'respondent')
                                                return <td key={i}> <Link to={'/participants/' + x.objectId}>{x.name}</Link></td>
                                        })
                                    }
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
                                    return(
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