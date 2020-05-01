import React, { Component } from 'react'
import { NavGame } from './NavGame';
import { NavSystems } from './NavSystems';
import { Container, Row, Col } from 'reactstrap';


export class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            instituteId: this.props.instituteId,
            computers: false,
            computerActive: false,
        };

    }

    componentDidMount() {
        this.userComputers();
    }

    render() {

        let content = this.state.computerActive != false
            ? (<div className={"container-game"}>
                <NavGame userId={this.state.userId} instituteId={this.state.instituteId} computer={this.state.computerActive} />
                <Container>
                    <Row>
                        <Col xs={3}></Col>
                        <Col xs={6}>
                            {this.props.children}
                        </Col>
                        <Col xs={3}></Col>
                    </Row>
                </Container>
                <NavSystems userId={this.state.userId} instituteId={this.state.instituteId} />
                </div>
            )
            : '';

        return (
            <>
                {content}
            </>
        );
    }

    async userComputers() {

        if (this.state.userId == undefined) {
            return;
        }
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
