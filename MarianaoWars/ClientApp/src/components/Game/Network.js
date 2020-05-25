﻿import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ScriptTypes } from '../services/SystemConstants';

export class Network extends Component {


    constructor(props) {
        super(props);
        this.state = {
            broadcast: 40,
            computerActive: false,
            data: [],
            loading: true,
            instituteId: props.match.params.instituteId
        };
        
        this.moveBroadcast = this.moveBroadcast.bind(this);

    }

    componentWillReceiveProps(nextProps) {

        if (this.state.computerActive.IpDirection !== nextProps.computerActive.IpDirection) {

            let broadcast = nextProps.computerActive.IpDirection.split('.')[3];

            this.setState({
                computerActive: nextProps.computerActive,
                broadcast: broadcast
            })
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.state.broadcast !== prevState.broadcast) {
            this.sourceData(this.state.broadcast);
        }
        
    }

    componentDidMount() {
        //this.sourceData(this.state.broadcast);
    }

    render() {
        let content = this.state.loading ?
            <p><label>Cargando...</label></p> :
            this.drawComputerTable();

        return (
            <div>
                <h2>192.168.0.{ this.state.broadcast }</h2>
                <div id="table">
                    {content}
                </div>
                <div>
                    <button onClick={ () => this.moveBroadcast(false) }>Izquierda</button>
                    <button onClick={ () => this.moveBroadcast(true) }>Derecha</button>
                </div>
            </div>
        );
    }

    actions(ip) {

        return (

            <Row>
                <Col xs={3}>
                    <Link to={{ pathname: `/game/${this.state.instituteId}/hackorder`, state: { type: ScriptTypes.ATTACK, ip: ip } }} >
                        <img /*style={{ maxWidth: '16px' }}*/ src={require('../../images/rocket.svg')} alt={"Hack"} />
                    </Link>
                </Col>
                <Col xs={3}>
                    <Link to={{ pathname: `/game/${this.state.instituteId}/hackorder`, state: { type: ScriptTypes.SPY, ip: ip } }}>
                        <img /*style={{ maxWidth: '16px' }}*/ src={require('../../images/bug.svg')} alt={"Debug"} />
                    </Link>
                </Col>
                <Col xs={3}>
                    <Link to={{ pathname: `/game/${this.state.instituteId}/hackorder`, state: { type: ScriptTypes.COLONIZADOR, ip: ip } }}>
                        <img /*style={{ maxWidth: '16px' }}*/ src={require('../../images/desktop-download.svg')} alt={"Persistence"} />
                    </Link>
                </Col>
                <Col xs={3}>
                    <Link to={{ pathname: `/game/${this.state.instituteId}/hackorder`, state: { type: ScriptTypes.TRANSPORT, ip: ip } }}>
                        <img /*style={{ maxWidth: '16px' }}*/ src={require('../../images/dependent.svg')} alt={"Transport"} />
                    </Link>
                </Col>
            </Row>

        );

    }

    drawComputerTable() {
        const items = [];

        for (var i = 0; i < 10; i++) {
            let ip = '192.168.' + i + '.' + this.state.broadcast;
            let computerName = '';
            for (var computer of this.state.data) {
                if (computer.IpDirection === ip)
                    computerName = computer.Name;
            }

            items.push(
                <tr key={i}>
                    <td>{ ip }</td>
                    <td>{ computerName }</td>
                    <td></td>
                    <td>
                        {this.actions(ip)}
                    </td>
                </tr>
            );
        }

        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Dirección Ip</th>
                        <th>Nombre del Equipo</th>
                        <th>Propietario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { items }
                </tbody>
            </table>
        );
    }

    async sourceData(broadcast) {
        
        let response = await fetch('intranet/computers?instituteId=' + this.state.instituteId + '&broadcast=' + broadcast);
        let result = await response.json();

        this.setState({
            data: result,
            loading: false
        });
    }

    moveBroadcast(goingFoward) {

        let value = goingFoward ? 1 : -1;
        let broadcast = parseInt(this.state.broadcast) + value;

        if (broadcast < 0) {
            broadcast =  49;
        }
        else if (broadcast > 49) {
            broadcast = 0;
        }

        this.setState({ broadcast: broadcast });
    }

}