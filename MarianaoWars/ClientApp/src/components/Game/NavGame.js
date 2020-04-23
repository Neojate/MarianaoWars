import React, { Component } from 'react';
import { Resource } from './Resource';
import { Row, Col } from 'reactstrap';

import * as signalR from '@aspnet/signalr';


export class NavGame extends Component {

    static displayName = NavGame.name;

    constructor(props) {
        super(props);

        this.state = {
            systemResources: [],
            loading: true,
            userId: this.props.userId,
            hubConnection: null,
            instituteId: this.props.instituteId,
            computer: this.props.computer
        };
    }

    componentDidMount() {
        this.systemResourceData();

        const nick = this.state.userId;

        const hubConnection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
        
        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection
                .start()
                .then(() => {
                    console.log('Connection started!');
                    //setInterval(this.actualizar, 2000);
                    this.actualizar();
                    //this.lanzarActualización();
                    //this.updateResources();
                })
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('actualizaRecursos', (receivedMessage) => {
                console.log(JSON.parse(receivedMessage));
                //this.setState({ computer: JSON.parse(receivedMessage) });
            });

            /*this.state.hubConnection.on('nombreMetodoRecibido', (receivedMessage) => {
                this.setState({ computer: JSON.parse(receivedMessage)});
            });*/



        });
        
    }

    /*
    lanzarActualización() {
        setInterval(this.actualizar, 2000, this.state.hubConnection, this.state.computer.Id);
    }
    */

    actualizar = () => {
        this.state.hubConnection
            .invoke('InitAct', this.state.userId, this.state.computer.Id)
                .catch(err => console.error(err));        
    }

    /*
    updateResources = () => {
        this.state.hubConnection
            .invoke('UpdateResources', this.state.userId, this.state.instituteId)
            .catch(err => console.error(err));
    };
    */

    async systemResourceData() {

        const response = await fetch('game/getSytemResource');
        const data = await response.json();
        this.setState({ systemResources: data, loading: false });

    }

    static renderResources(systemResources, computer) {

        var comupterStyle = {
            height: '100px',
            width: '100px',
            margin: 'auto',
            border: '1px solid black',
            borderRadius: '50%'
        }

        return (
            <Row style={{ alignItems : 'center' }}>
                {systemResources.map((value, index) => {

                    var qty = 0;
                    var quantity = 0;

                    switch (value.name) {
                        case "Imaginacion":
                            quantity = computer.Resource.Ingenyous;
                            break;

                        case "Café":
                            quantity = computer.Resource.Coffe;
                            break;

                        case "Descanso":
                            quantity = computer.Resource.Stress;
                            break;

                        case "Conocimiento":
                            quantity = computer.Resource.Knowledge;
                            break
                    }

                    var color = qty < 80 ? "succes" : "danger";

                    return <Resource key={value.id}
                        id={`recurso${value.id}`}
                        image="iconResource1.png"
                        quantity={quantity}
                        color={color}
                        value={qty}
                        popoverHeader={value.name}
                        popoverBody={value.description}
                    />
                })}

                <Col className="text-center" xs="3">
                    <img className="img-fluid" style={{ maxWidth: '50%' }} src={require('../../images/internet.png')} />
                </Col>

                <Col xs="2">
                    <p>{computer.Name}</p>
                </Col>
                <Col xs="2">
                    <p>{computer.IpDirection}</p>
                </Col>
                <Col xs="1">
                    <p>{computer.MemmoryUsed + '/' + computer.Memmory}</p>
                </Col>

            </Row>
        );

        
    }

    render() {

        let contents = (!this.state.loading)
            ? NavGame.renderResources(this.state.systemResources, this.state.computer)
            : <p><em>Loading...</em></p>;

        let computer = this.state.computer;

        return (
            <div>
                {contents}
            </div>
            
        );
    }

}