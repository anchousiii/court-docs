import React, { Component } from 'react';

export default class Participant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participant: {},
            loading: false
        };

    }
    componentDidMount(){
        const id = this.props.match.params.id;
        this.setState({
            loading: true
        })
        fetch('https://api.backendless.com/51755EE6-B7E8-95DE-FF49-2B7776E58C00/D98F4083-FE53-95A0-FFA1-C38959E80100/data/participant/' + id)
            .then(response => response.json())
            .then(participant =>
                this.setState({
                    participant,
                    loading: false
                })
            )


    }

    render() {
        const {
            participant,
            loading
        } = this.state
        return (loading)
            ? <div>Loading Participant...</div>
            : <div>
                    <h4>Lawsuits Participant</h4>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Address</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                                    <tr>
                                        <td>{participant.name}</td>
                                        <td>{participant.type}</td>
                                        <td>{participant.address}</td>
                                        <td>{participant.phone}</td>
                                    </tr>
                        </tbody>
                    </table>
                </div>

    }

}