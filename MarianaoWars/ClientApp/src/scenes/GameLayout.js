import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { Game } from '../components/game/Game';
import { Network } from '../components/game/Network';
import { SystemPanel } from '../components/game/SystemPanel';
import { Messages } from '../components/game/Messages';
import { MessagePanel } from '../components/game/MessagePanel';
import { HackPanel } from '../components/game/HackPanel';
import authService from '../components/api-authorization/AuthorizeService';
import systemServices from '../components/services/SytemServices';
import * as signalR from '@aspnet/signalr';

import '../css/marianao_style.css';
import { SystemsType } from '../components/services/SystemConstants';

export class GameLayout extends Component {
    static displayName = GameLayout.name;

    constructor(props) {
        super(props);

        this.state = {
            userId: false,
            instituteId: this.props.match.params.instituteId,
            hubConnection: null,
            buildOrders: [],
            hackOrders: [],
            computers: false,
            computerActive: false,
            institute: false,
            systems: [],
            loading: true,
            messagesNotRead: [],
        };

        this.getInstitute = this.getInstitute.bind(this);
        this.load = this.load.bind(this);
        this.load(); 
    }

    async load() {

        const user = await authService.getUser();
        this.setState({userId: user.sub})

        await this.userComputers();
        await this.getSystems();
        await this.getInstitute(this.props.match.params.instituteId);

        this.setState({ loading: false })

    }


    componentDidMount() {

        const hubConnection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

        const nick = this.state.userId;

        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection
                .start()
                .then(() => {

                    setInterval(this.InitUpdate, 1000);
                    //setInterval(this.BuildOrdersList, 1000);
                    setInterval(this.MessagesNotReading, 1000);

                })
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('updateResources', (receivedMessage) => {
                var computer = JSON.parse(receivedMessage);
                this.setState({ computerActive: computer });
            });

            this.state.hubConnection.on('buildOrders', (receivedMessage) => {
                var buildOrders = JSON.parse(receivedMessage);
                this.setState({ buildOrders: buildOrders });
            });

            this.state.hubConnection.on('hackOrders', (receivedMessage) => {
                var hackOrders = JSON.parse(receivedMessage);
                this.setState({ hackOrders: hackOrders });
            });

            this.state.hubConnection.on('notReadMessagesResponse', (receivedMessage) => {
                var messages = JSON.parse(receivedMessage);
                    this.setState({
                        messagesNotRead: messages
                    });
            });

        });
    }

    InitUpdate = () => {
        this.state.hubConnection
            .invoke('InitUpdate', this.state.userId, this.state.computerActive.Id)
            .catch(err => console.error(err));
    }

    BuildOrdersList = () => {
        this.state.hubConnection
            .invoke('BuildOrdersList', this.state.userId, this.state.computerActive.Id)
            .catch(err => console.error(err));
    }

    MessagesNotReading = () => {
        this.state.hubConnection
            .invoke('NotReadMessages', parseInt(this.state.instituteId), this.state.userId)
            .catch(err => console.error(err));
    }

    async getSystems() {
        const systems = await systemServices.getSystems();
        this.setState({systems: systems})
    }

    async getInstitute(id) {
        const institute = await systemServices.getInstitute(id);
        this.setState({ institute: institute })
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
        const computers = await response.json();

        for (const computer of computers) {
            if (computer.IsDesk) {
                this.setState({
                    computerActive: computer,
                });
            }
        }

        this.setState({
            computers: computers,
        });
    }


    render() {

        var content = (this.loading) ?
            <p>Loading...</p>
            : (<Game userId={this.state.userId}
                instituteId={this.state.instituteId} systems={this.state.systems}
                computers={this.state.computers} computerActive={this.state.computerActive}
                buildOrders={this.state.buildOrders} messagesNotRead={this.state.messagesNotRead}
                hackOrders={this.state.hackOrders} institute={this.state.institute}>

                <Route exact path="/game/:instituteId" component={Network} />
                <Route path="/game/:instituteId/system" render={(props) => <SystemPanel {...props} computerActive={this.state.computerActive} buildOrders={this.state.buildOrders} institute={this.state.institute} />} />
                <Route path="/game/:instituteId/messages" render={(props) => <Messages {...props} userId={this.state.userId}/>} />
                <Route path="/game/:instituteId/message" component={MessagePanel} />
                <Route path="/game/:instituteId/expeditions" render={(props) => <HackPanel {...props} systemScripts={this.state.systems[SystemsType.SCRIPT]} computerActive={this.state.computerActive} instituteId={this.state.instituteId} institute={this.state.institute} />} />

            </Game>);
    return (
        <>
            {content}
        </>
    );
  }
}
