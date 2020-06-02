import React, { Component } from 'react';
import { Resource } from './Resource';
import { Row, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BuildIdName, SystemsType } from '../services/SystemConstants';


export class NavGame extends Component {

    static displayName = NavGame.name;

    constructor(props) {
        super(props);

        this.state = {
            systemResources: [],
            userId: this.props.userId,
            instituteId: this.props.instituteId,
            computer: this.props.computer,
            notRead: false,
            institute: this.props.institute,
            systems: [],
            messagesNotRead: [],
            modal: false,
        };
        this.changeComputerName = this.changeComputerName.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    componentWillReceiveProps(nextProps) {

        if (this.state.systems !== nextProps.systems) {
            this.setState({
                systems: nextProps.systems
            })
        }
        if (this.state.computer !== nextProps.computer) {
            this.setState({
                computers: nextProps.computer
            })
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.computer !== prevProps.computer) {
            this.setState({
                computer: this.props.computer
            })
        }
        if (this.props.systemResources !== prevProps.systemResources) {
            this.setState({
                systemResources: this.props.systemResources
            })
        }
        if (this.props.systems !== prevProps.systems) {
            this.setState({
                systems: this.props.systems
            })
        }
        if (this.props.messagesNotRead !== prevProps.messagesNotRead) {
            this.setState({
                messagesNotRead: this.props.messagesNotRead
            })
        }
        if (this.props.institute !== prevProps.institute) {
            this.setState({
                institute: this.props.institute
            })
        }
    }

    componentDidMount() { }

    async changeComputerName(event) {

        event.preventDefault();

        const data = {
            computerName: this.inputNameComputer.value,
            computerId: this.state.computer.Id
        };

        var url = 'game/updatecomputername';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        this.setState({
            modal: !this.state.modal,
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


    colorProgress(value, maxValue) {

        let fraccion = maxValue / 3;
        let color = "";

        if (value < fraccion) {
            color = "success";
        }
        else if (value >= fraccion && value <= fraccion * 2) {
            color = "warning";
        }
        else {
            color = "danger";
        }

        return color;

    }

    renderResources(systems, computer) {

        if (systems.length === 0) {
            return "";
        }

        return (
            <Container>
                <Row style={{ alignItems: 'center' }}>
                    {systems[SystemsType.RESOURCE].map((systemResource, index) => {

                        //capacidad de almacenamiento
                        const mySql = systems[SystemsType.SOFTWARE].find(element => element.name === "MySql");
                        let capacity = mySql.action1.split(",")[computer.Software.MySqlVersion];

                        //nombre en columna del recurso
                        let resourceName = BuildIdName[systemResource.buildId];

                        let quantity = computer.Resource[resourceName];

                        //incremento x minuto (mirar que si estamos en negativo, el incremento es la mitad)
                        let increments = systemResource.increment.split(",");
                        let increment = increments[computer.Resource[`${resourceName}Level`]] * this.state.institute.RateCost;

                        if (computer.Resource.Stress < 0) {
                            increment = increment / 2;
                        }


                        var color = this.colorProgress(quantity, capacity);

                        if (systemResource.buildId === 4 && quantity < 0) {
                            color = "danger";
                        }
                        else if (systemResource.buildId === 4 && quantity < 0) {
                            color = "success";
                        }

                        let popoverBody =
                            (<>
                                <p>{systemResource.description}</p>
                                <hr />
                                <p className={"pop-capacity"}>Capacidad Maxima: <span>{capacity}</span></p>
                                <p className={"pop-increment"}>Incremento por Hora: <span>{increment * 60}</span></p>
                            </>);

                        return <Resource key={systemResource.id}
                            id={`recurso${systemResource.id}`}
                            image="iconResource1.png"
                            quantity={quantity}
                            color={color}
                            value={(Math.abs(quantity) * 100) / capacity}
                            popoverHeader={systemResource.name}
                            popoverBody={popoverBody}
                        />
                    })}



                    <Col className="text-center" xs="4">
                        <Link to={{ pathname: `/game/${this.props.instituteId}` }}><img alt="computers" className="img-fluid pointer-scale" style={{ maxWidth: 'autor', maxHeight: '50px' }} src={require('../../images/explorer.png')} /></Link>
                        <Link className="link-message pointer-scale" to={{ pathname: `/game/${this.props.instituteId}/messages` }}>
                            <img alt="mail" className="img-fluid pointer-scale" style={{ maxWidth: 'autor', maxHeight: '50px' }} src={require('../../images/icon/mailclose.png')} />
                            {this.state.messagesNotRead.length !== 0 ? <span className="badge badge-pill badge-danger">{this.state.messagesNotRead.length}</span> : ''}
                        </Link>
                    </Col>

                    <Col xs="4" className="d-flex justify-content-between">
                        <p className="pointer pointer-scale" onClick={() => this.toogleOpen(computer.Id, computer.Name)} >{computer.Name}</p>
                        <p>{computer.IpDirection}</p>
                        <p onClick={this.props.back}>{computer.MemmoryUsed + '/' + computer.Memmory}</p>
                        <img className="pointer pointer-scale pointer-round" onClick={this.props.back} alt="cambiar fondo" src={require(`../../images/settings.svg`)}></img>
                    </Col>

                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toogle} className="">
                    <Form>
                        <ModalHeader toggle={this.toogle}>{this.state.nameComputer}</ModalHeader>
                        <ModalBody>
                            <Label for="computerName">Puedes cambiar el nombre de tu ordenador si lo desas</Label>
                            <Input type="text" name="name" id="computerName" innerRef={name => this.inputNameComputer = name} placeholder={this.state.nameComputer} />
                        </ModalBody>
                    </Form>
                    <ModalFooter>
                        <Button onClick={this.changeComputerName} id="submit" color="primary">Cambiar</Button>{' '}
                        <Button color="secondary" id="cancel" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>

                </Modal>
            </Container>
        );


    }

    render() {

        let contents = this.renderResources(this.state.systems, this.props.computer);

        return (
            <div>
                {contents}
            </div>

        );
    }

}