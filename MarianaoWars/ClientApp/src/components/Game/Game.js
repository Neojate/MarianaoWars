﻿import React, { Component } from 'react'
import { NavGame } from './NavGame';
import { NavSystems } from './NavSystems';
import { Container, Row, Col } from 'reactstrap';
import '../../css/marianao_style.css';


export class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            instituteId: this.props.instituteId,
            systems: this.props.systems,
            computers: [],
            computerActive: this.props.computerActive,
            buildOrders: [],
            capacityResource: 0,
            valor: 1,
        };

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
        if (this.props.computers !== prevProps.computers) {
            this.setState({
                computers: this.props.computers
            })
        }

    }

    computers() {

        return (
            <>
                {this.state.computers.map((computer, index) => {

                    return (
                        <div key={index} className="computers-container">
                            <Row>
                                <Col xs={12}>
                                    <div className={computer.IsDesk === 1 ? "principal-pc":"portatil-pc" }></div>
                                    <p className={"text-center"}>Ip {computer.IpDirection} </p>
                                </Col>
                            </Row>
                        </div>
                    );
                })
                }
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

        let segundos = parseInt(time / 1000, 10);
        let dias = Math.floor(segundos / (3600 * 24));
        segundos -= dias * 3600 * 24;
        let horas = Math.floor(segundos / 3600);
        segundos -= horas * 3600;
        let minutos = Math.floor(segundos / 60);
        segundos -= minutos * 60;
        
        return `${dias}d. ${String(horas).padStart(2, "0")}h. ${String(minutos).padStart(2, "")}m. ${ String(segundos).padStart(2, "")}s`;
    }

    builds() {


        return (
            <>
                {this.state.buildOrders.map((build, index) => {

                    let time = this.timeLeft(build.EndTime);

                    //convierte el valor en string de dos caracteres
                    let buildId = String(build.BuildId).padStart(2, "0");

                    //primer valor marca la posición en el array de systems
                    let indiceBuild = buildId.substring(0, 1);
                    if (indiceBuild % 2 === "1") indiceBuild--;

                    //segundo valor marca la posición en el array del tipo de systems
                    let indiceBuildId = buildId.substring(1, 2);

                    let buildName = this.state.systems[indiceBuild][indiceBuildId - 1].name;

                    return (
                        <div key={index} className="buildOrders-container">
                            <Row>
                                <Col xs={12}>
                                    <p>Actulaización de {buildName}</p>
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
                            systemResources={this.state.systems[1]}
                            systems={this.state.systems}
                            computer={this.state.computerActive}
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
