import React, { Component } from 'react'
import { NavGame } from './NavGame';
import { NavSystems } from './NavSystems';
import { Container, Row, Col } from 'reactstrap';
import { SystemsType, ScriptTypes, ScriptNames } from '../services/SystemConstants';
import { stringUtils } from '../services/Utils';
import '../../css/marianao_style.css';

export class Game extends Component {

    constructor(props) {
        super(props);

        this.backgrounds = [
            require(`../../images/backgrounds/background.jpg`),
            require(`../../images/backgrounds/back2.jpg`),
            require(`../../images/backgrounds/win10_2.jpeg`),
            require(`../../images/backgrounds/winxp.jpg`),
            require(`../../images/backgrounds/nic.jpg`),
            require(`../../images/backgrounds/marianao_1.jpg`),
            require(`../../images/backgrounds/marianao_2.jpg`),
            require(`../../images/backgrounds/marianao_3.jpg`),
        ]

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
            backgroundActive: 0
        };
        this.changeBack = this.changeBack.bind(this);

    }





    
    componentDidMount() {
        //this.userComputers();
    }

    componentWillReceiveProps(nextProps) {
        /*
        if (this.state.computerActive !== nextProps.computerActive) {
            this.setState({
                computerActive: nextProps.computerActive
            })
        }
        if (this.state.computers !== nextProps.computers) {
            this.setState({
                computers: nextProps.computers
            })
        }
        */
        
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

    computerActive(pos) {
        this.props.changeComputerActive(pos);
    }


    computers() {

        return (
            <>
                {this.state.computers.map((computer, index) => {

                    return (
                        <div key={index} onClick={() => this.computerActive(index)} className={`computers-container animation-fadein_${index} ${computer.Id === this.state.computerActive.Id ? 'desk' : ''}`}>
                            <Row>
                                <Col xs={12}>
                                    <div className={computer.IsDesk === 1 ? "principal-pc" : "portatil-pc"}></div>
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

        return stringUtils.timeToString(time);
    }

    hackOrders() {

        return (
            <>
                {this.state.hackOrders.map((hackOrder, index) => {

                    let time = this.timeLeft(hackOrder.EndTime);
                    let position = (this.state.computerActive.Id === hackOrder.From) ? 'Ejecutando' : 'Recibiendo';

                    //Si recibo el escript no se muestra el viaje de vuelta || o recibo un script espia
                    if ( (position === 'Recibiendo' && time === 'Finalizado') || (position === 'Recibiendo' && hackOrder.Type === ScriptTypes.SPY) ) {
                        return '';
                    }
                    //por el contrario, muestro el tiempo de vuelta
                    else if (position === 'Ejecutando' && time === 'Finalizado') {
                        position = 'Retornando';
                        time = this.timeLeft(hackOrder.ReturnTime);
                    }

                    let name = ScriptNames[hackOrder.Type];

                    return (
                        <div key={index} className={`hacks-container animation-fadein_${this.state.buildOrders.length + index}`}>
                            <Row>
                                <Col xs={12}>
                                    <h5>{position}</h5>
                                    <h5>{name}</h5>
                                    <p><b>{time}</b></p>
                                </Col>
                            </Row>
                        </div>
                    );
                })
                }
            </>

        )

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
                    console.log("buildId", indiceBuildId);
                    console.log("system", this.state.systems);
                    let name = this.state.systems[indiceBuild][indiceBuildId - 1].name;

                    /**
                    <p>Actulaización de {name}</p>
                    <p>Tiempo restante</p>
                    <p className={"m-0"}>{time}</p>
                    */


                    return (
                        <div key={index} className={`buildOrders-container build-spinner animation-fadein_${index}`}>
                            <Row>
                                <Col xs={12} className="d-flex flex-column justify-content-center">
                                    <h5>Actualizando {name}</h5>
                                    <p className={"m-0"}><b>{time}</b></p>
                                </Col>
                                </Row>
                            </div>
                    );
                })
                }
            </>

        )

    }

    changeBack() {
        let back = this.state.backgroundActive;
        back = (back < 7) ? back + 1 : 0;

        this.setState({ backgroundActive: back });
    }


    render() {

        let back = {
            backgroundImage: `url("${this.backgrounds[this.state.backgroundActive]}")`
        }

        let content = (this.state.systems !== undefined && this.state.computers.length !== 0)
            ? (
                <div className="background" style={back}>
                    <div className="navgame">
                        <NavGame
                            userId={this.state.userId}
                            instituteId={this.state.instituteId}
                            systemResources={this.state.systems[SystemsType.RESOURCE]}
                            systems={this.state.systems}
                            computer={this.state.computerActive}
                            messagesNotRead={this.state.messagesNotRead}
                            institute={this.state.institute}
                            back={this.changeBack}
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
                                    {this.hackOrders()}
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
