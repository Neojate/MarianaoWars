import React, { Component } from 'react'
import { NavGame } from './NavGame';
import { NavSystems } from './NavSystems';
import { Container, Row, Col } from 'reactstrap';
import '../../css/marianao_style.css';
import { SystemPanel } from './SystemPanel';


export class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            instituteId: this.props.instituteId,
            systems: this.props.systems,
            computers: this.props.computer,
            computerActive: this.props.computerActive,
            valor: 1,
        };

    }

    componentDidMount() {
        //this.userComputers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.computerActive != prevProps.computerActive) {
            this.setState({
                computerActive: this.props.computerActive
            })
        }
        if (this.props.systems != prevProps.systems) {
            this.setState({
                systems: this.props.systems
            })
        }

    }


    render() {

        /*
        //Mapea todos los children
        var childrenWithMoreProps = React.Children.map(this.props.children, (child) => {

            //si el componente es el mismo que buscamos modificar
            if (child.props.component === SystemPanel) {  

                //clonamos y modificamos sus prop (esto no ha fucionado...)
                return React.cloneElement(child, {
                    customSystem: "hola"
                });
                
            } else {
                return child;
            }
        });
        */




        let content = (this.state.systems != undefined)
            ? (
                <div className="background">
                    <div className="navgame">
                        <NavGame userId={this.state.userId} instituteId={this.state.instituteId} systemResources={this.state.systems[1]} computer={this.state.computerActive} />
                    </div>
                    <div>
                        <Container>
                            <Row>
                                <Col xs={3}></Col>
                                <Col xs={6}>
                                    {this.props.children}
                                </Col>
                                <Col xs={3}></Col>
                            </Row>
                        </Container>
                    </div>
                    <NavSystems userId={this.state.userId} instituteId={this.state.instituteId} systems={this.state.systems} />
                </div>
            )
            :
            '';

        return (
            <>
                {content}
            </>
        );
    }

    async userComputers() {

        if (this.state.userId === undefined) {
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
