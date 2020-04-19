import React, { Component } from 'react';
import { Resource } from './Resource';
import { Row } from 'reactstrap';
import authService from '../api-authorization/AuthorizeService';
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
            computerLoading: true,
            computer: {}
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
                    this.updateResources();
                })
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('nombreMetodoRecibido', (receivedMessage) => {
                this.setState({ computer: JSON.parse(receivedMessage), computerLoading: false });
            });

        });
    }

    updateResources = () => {
        this.state.hubConnection
            .invoke('UpdateResources', this.state.userId, this.state.instituteId)
            .catch(err => console.error(err));
    };

    async systemResourceData() {

        const response = await fetch('game/getSytemResource');
        const data = await response.json();
        this.setState({ systemResources: data, loading: false });

    }

    static renderResources(systemResources, computer) {

        return (
            <Row>



                {systemResources.map((value, index) => {


                    var qty = 0;
                    var quantity = 0;

                    switch (value.name) {
                        case "Ingenio":
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
            </Row>
            );
    }

    render() {

        let contents = (!this.state.loading && !this.state.computerLoading)
            ? NavGame.renderResources(this.state.systemResources, this.state.computer)
            : <p><em>Loading...</em></p>;

        return (
            <div>
                {contents}
            </div>
        );
    }

}