import React, { Component } from 'react';
import { Resource } from './Resource';
import { Row, Col, Container } from 'reactstrap';
import systemServices from '../services/SytemServices';
import * as signalR from '@aspnet/signalr';
import { Link } from 'react-router-dom';


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

                    setInterval(this.InitUpdate, 1000);

                })
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('updateResources', (receivedMessage) => {
                var computer = JSON.parse(receivedMessage);
                this.setState({ computer: computer });
            });

        });

    }

    InitUpdate = () => {
        this.state.hubConnection
            .invoke('InitUpdate', this.state.userId, this.state.computer.Id)
            .catch(err => console.error(err));
    }

    async systemResourceData() {

        var systemResource = await systemServices.systemResourceData();

        //const response = await fetch('gamenav/getSytemResource');
        //const data = await response.json();
        this.setState({ systemResources: systemResource, loading: false });

    }

    colorProgress(value, maxValue) {

        var fraccion = maxValue / 3;
        var color = "";

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

    renderResources(systemResources, computer) {

        var comupterStyle = {
            height: '100px',
            width: '100px',
            margin: 'auto',
            border: '1px solid black',
            borderRadius: '50%'
        }

        return (
            <Container>
            <Row style={{ alignItems: 'center' }}>
                {systemResources.map((systemResource, index) => {

                    var qty = 0;
                    var quantity = 0;
                    var maxQuantity = systemResource.lastVersion;
                    var maxQuantityLevel = 0;

                    switch (systemResource.name) {
                        case "Imaginacion":
                            quantity = computer.Resource.Ingenyous;
                            maxQuantityLevel = computer.Resource.IngenyousLevel * maxQuantity;
                            break;

                        case "Cafe":
                            quantity = computer.Resource.Coffe;
                            maxQuantityLevel = computer.Resource.CoffeLevel * maxQuantity;
                            break;

                        case "Descanso":
                            quantity = computer.Resource.Stress;
                            maxQuantityLevel = computer.Resource.StressLevel * maxQuantity;
                            break;

                        case "Conocimiento":
                            quantity = computer.Resource.Knowledge;
                            maxQuantityLevel = computer.Resource.KnowledgeLevel * maxQuantity;
                            break
                    }

                    var color = this.colorProgress(quantity, maxQuantityLevel);

                    return <Resource key={systemResource.id}
                        id={`recurso${systemResource.id}`}
                        image="iconResource1.png"
                        quantity={quantity}
                        color={color}
                        value={(quantity * 100) / maxQuantity}
                        popoverHeader={systemResource.name}
                        popoverBody={systemResource.description}
                    />
                })}

                    <Col className="text-center" xs="3">
                        <Link to={{ pathname: `/game/${this.props.instituteId}`}}><img className="img-fluid" style={{ maxWidth: '50%' }} src={require('../../images/internet.png')} /></Link>
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
            </Container>
        );


    }

    render() {

        let contents = (!this.state.loading)
            ? this.renderResources(this.state.systemResources, this.state.computer)
            : <p><em>Loading...</em></p>;

        let computer = this.state.computer;

        return (
            <div>
                {contents}
            </div>

        );
    }

}