import React, { Component } from 'react'
import { NavGame } from './NavGame';
import authService from '../api-authorization/AuthorizeService';

export class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.location.state.userId,
            instituteId: this.props.match.params.instituteId,
            computers: false,
            computerActive: false
        };
    }

    componentDidMount() {
        //this.populateState();
        this.userComputers();
    }


    render() {

        let content = this.state.computerActive != false
            ? <NavGame userId={this.state.userId} instituteId={this.state.instituteId} computer={this.state.computerActive} />
            : '';

        return (
            <div>
                {content}
            </div>
        );
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
        this.setState({
            isAuthenticated,
            'userId': user.sub
        });
    }

    async userComputers() {
        const data = { userId: this.state.userId, instituteId: this.state.instituteId };
        console.log(data);
        var url = 'institutes/enrollmentcomputer';

        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json();
        let computer = {};

        for (const computer of result) {
            if (computer.IsDesk) {
                this.setState({
                    computerActive: computer,
                });
            }
        }

        this.setState({
            computers: result,
        });
    }

}
