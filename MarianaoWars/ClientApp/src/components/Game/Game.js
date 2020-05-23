import React, { Component } from 'react'
import { NavGame } from './NavGame';
import { NavSystems } from './NavSystems';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Label } from 'reactstrap';
import { SystemsType, ScriptTypes } from '../services/SystemConstants';
import { stringUtils } from '../services/Utils';
import '../../css/marianao_style.css';


export class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            instituteId: this.props.instituteId,
            systems: this.props.systems,
            institute: this.props.institute,
            computers: [],
            computerActive: this.props.computerActive,
            buildOrders: [],
            hackOrders: [],
            capacityResource: 0,
            valor: 1,
            modal: false,
            messagesNotRead: [],
        };

        this.changeComputerName = this.changeComputerName.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    async changeComputerName(event) {

        event.preventDefault();

        const data = {
            computerName: this.inputName.value,
            computerId: this.state.computerId
        };

        var url = 'game/updatecomputername';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let result = '';
        try {
            result = await response.json();
        }
        catch (e) {
            console.log(e);
        }

        let computers = this.state.computers.slice();
        for (let i = 0; i < computers.length; i++) {
            if (computers[i].Id == result.Id) {
                computers[i] = result;
            }
        }
        
        this.setState({
            modal: !this.state.modal,
            computers: computers
        });

    }

    toogleOpen(computerId, nameComputer) {
        this.setState({
            modal: !this.state.modal,
            computerId: computerId,
            nameComputer: nameComputer
        });
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }


    componentDidMount() {
        //this.userComputers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.computerActive !== prevProps.computerActive) {
            this.setState({
                computerActive: this.props.computerActive
            })
        }
        if (this.props.institute !== prevProps.institute) {
            this.setState({
                institute: this.props.institute
            })
        }
        if (this.props.systems !== prevProps.systems) {
            this.setState({
                systems: this.props.systems
            })
        }
        if (this.props.buildOrders !== prevProps.buildOrders) {
            this.setState({
                buildOrders: this.props.buildOrders
            })
        }
        if (this.props.hackOrders !== prevProps.hackOrders) {
            this.setState({
                hackOrders: this.props.hackOrders
            })
        }
        if (this.props.computers !== prevProps.computers) {
            this.setState({
                computers: this.props.computers
            })
        }
        if (this.props.messagesNotRead !== prevProps.messagesNotRead) {
            this.setState({
                messagesNotRead: this.props.messagesNotRead
            })
        }

    }

    computers() {

        return (
            <>
                {this.state.computers.map((computer, index) => {

                    return (
                        <div key={index} onClick={() => this.toogleOpen(computer.Id, computer.Name)} className={`computers-container ${computer.IsDesk == 1 ? 'desk' : ''}`}>
                            <Row>
                                <Col xs={12}>
                                    <div className={computer.IsDesk == 1 ? "principal-pc":"portatil-pc" }></div>
                                    <p className={"text-center"}>Ip {computer.IpDirection} </p>
                                </Col>
                            </Row>
                        </div>
                    );
                })
                }
                <Modal isOpen={this.state.modal} toggle={this.toogle} className="">
                    <Form>
                        <ModalHeader toggle={this.toogle}>{this.state.nameComputer}</ModalHeader>
                        <ModalBody>
                            <Label for="computerName">Puedes cambiar el nombre de tu ordenador si lo desas</Label>
                            <Input type="text" name="name" id="computerName" innerRef={name => this.inputName = name} placeholder={this.state.nameComputer} />
                        </ModalBody>
                    </Form>
                    <ModalFooter>
                        <Button onClick={this.changeComputerName} id="submit" color="primary">Cambiar</Button>{' '}
                        <Button color="secondary" id="cancel" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                    
                </Modal>
            </>
            )
    }

    timeLeft(endTime) {

        let fecha1 = new Date(endTime);
        let fecha2 = new Date();

        if (fecha1.getTime() < fecha2.getTime()) {
            return "Finalizado";
        }

        let time = fecha1.getTime() - fecha2.getTime();

        return stringUtils.timeToString(time);

    }

    builds() {

        let orders = this.state.buildOrders.concat(this.state.hackOrders);

        return (
            <>
                {orders.map((build, index) => {

                    let time = this.timeLeft(build.EndTime);

                    let name = '';

                    if ('BuildId' in build) {
                        //convierte el valor en string de dos caracteres
                        let buildId = String(build.BuildId).padStart(2, "0");

                        //primer valor marca la posición en el array de systems
                        let indiceBuild = buildId.substring(0, 1);
                        if (indiceBuild % 2 === "1") indiceBuild--;

                        //segundo valor marca la posición en el array del tipo de systems
                        let indiceBuildId = buildId.substring(1, 2);
                        console.log("buildId", indiceBuildId);
                        console.log("system", this.state.systems);
                        name = this.state.systems[indiceBuild][indiceBuildId - 1].name;
                    } else {

                        name = build.Type;

                    }

                    return (
                        <div key={index} className="buildOrders-container">
                            <Row>
                                <Col xs={12}>
                                    <p>Actulaización de {name}</p>
                                    <p>Tiempo restante</p>
                                    <p className={"m-0"}>{time}</p>
                                </Col>
                            </Row>
                        </div>
                    );
                })
                }
            </>

        )


    }


    render() {

        let content = (this.state.systems !== undefined)
            ? (
                <div className="background">
                    <div className="navgame">
                        <NavGame
                            userId={this.state.userId}
                            instituteId={this.state.instituteId}
                            systemResources={this.state.systems[SystemsType.RESOURCE]}
                            systems={this.state.systems}
                            computer={this.state.computerActive}
                            messagesNotRead={this.state.messagesNotRead}
                            institute={this.state.institute}
                        />
                    </div>
                    <div>
                        <Container>
                            <Row>
                                <Col xs={{ size: 2, order: 1, offset: 0 }}>
                                    {this.computers()}
                                </Col>
                                <Col xs={{ size: 6, order: 2, offset: 1 }}>
                                    {this.props.children}
                                </Col>
                                <Col xs={{ size: 2, order: 3, offset: 1 }}>
                                    {this.builds()}
                                </Col>
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
