import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AllParticipants extends Component{
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
            ? <div>Loading Participants...</div>
            : (!participants.length)
                ? <div>No participants</div>
                : <div>
                    <h4>Lawsuits Participants</h4>
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
                                var objectPath = '/participants/' + x.objectId;
                                return (

                                        <tr key={i}>

                                            <td>{countParticipants++}</td>
                                            <td><Link to={objectPath}>{x.name}</Link></td>
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
