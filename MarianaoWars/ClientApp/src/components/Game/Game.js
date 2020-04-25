import React, { Component } from 'react'
import { NavGame } from './NavGame';
import { Container } from 'reactstrap';

export class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            instituteId: this.props.instituteId,
            computers: false,
            computerActive: false
        };
    }

    componentDidMount() {
        this.userComputers();
    }


    render() {

        let content = this.state.computerActive != false
            ? (<>
                <NavGame userId={this.state.userId} instituteId={this.state.instituteId} computer={this.state.computerActive} />
                <Container>
                    {this.props.children}
                </Container>
                <div><p>footer</p></div>
                </>
            )
            : '';

        return (
            <div>
                {content}
            </div>
        );
    }

    async userComputers() {
        const data = { userId: this.state.userId, instituteId: this.state.instituteId };
        var url = 'institutes/enrollmentcomputer';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
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
