import React, { Component } from 'react';
import { Resource } from './Resource';
import { Row, Col, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BuildIdName, SystemsType } from '../services/SystemConstants'

import { Mailclose } from '../../images/icon/mailclose.png';


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
            systems: [],
            messagesNotRead: []
        };

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
    }

    componentDidMount() {
        
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
                        let increment = increments[computer.Resource[`${resourceName}Level`]];

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
                    <Link to={{ pathname: `/game/${this.props.instituteId}` }}><img alt="computers" className="img-fluid" style={{ maxWidth: 'autor', maxHeight: '50px' }} src={require('../../images/internet.png')} /></Link>
                        <Link to={{ pathname: `/game/${this.props.instituteId}/messages` }}>
                            <img alt="mail" className="img-fluid" style={{ maxWidth: 'autor', maxHeight: '50px' }} src={require('../../images/icon/mailclose.png')} />
                            {this.state.messagesNotRead.length !== 0 ? <span className="badge badge-pill badge-danger">{this.state.messagesNotRead.length}</span> : ''}
                        </Link>
                </Col>

                <Col xs="2">
                    <p>{computer.Name}</p>
                </Col>
                <Col xs="1">
                    <p>{computer.IpDirection}</p>
                </Col>
                    <Col xs="1 text-right">
                    <p>{computer.MemmoryUsed + '/' + computer.Memmory}</p>
                </Col>

                </Row>
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