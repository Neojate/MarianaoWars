import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { Game } from '../components/game/Game';
import { Network } from '../components/game/Network';
import { SystemPanel } from '../components/game/SystemPanel';
import systemServices from '../components/services/SytemServices';
import * as signalR from '@aspnet/signalr';

export class GameLayout extends Component {
    static displayName = GameLayout.name;

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.location.state.userId,
            instituteId: this.props.match.params.instituteId,
            hubConnection: null,
            computers: false,
            computerActive: false,
            systems: [],
            loading: true
        };

        this.load = this.load.bind(this);
        this.load();

    }

    async load() {

        await this.userComputers();
        await this.getSystemResource();



        this.setState({
            loading: false
        })

    }


    componentDidMount() {

        const hubConnection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

        const nick = this.state.userId;

        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection
                .start()
                .then(() => {

                    setInterval(this.InitUpdate, 1000);
                    setInterval(this.BuildOrders, 1000);

                })
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('updateResources', (receivedMessage) => {
                var computer = JSON.parse(receivedMessage);
                this.setState({ computerActive: computer });
            });

        });
    }

    InitUpdate = () => {
        this.state.hubConnection
            .invoke('InitUpdate', this.state.userId, this.state.computerActive.Id)
            .catch(err => console.error(err));
    }

    BuildOrders = () => {
        this.state.hubConnection
            .invoke('BuildOrders', this.state.userId, this.state.computerActive.Id)
            .catch(err => console.error(err));
    }

    async getSystemResource() {

        const [systemResource, systemSofftware] = await Promise.all([systemServices.systemResourceData(), systemServices.systemSoftwareData()]);

        var stateTemp = this.state.systems.slice();
        stateTemp[1] = systemResource;
        stateTemp[2] = systemSofftware;

        this.setState({
            systems: stateTemp,
            loading: false
        })
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

        var content = (this.loading)
            ? (
                <p>Loading...</p>
            )
            : (<Game userId={this.state.userId} instituteId={this.state.instituteId} systems={this.state.systems} computerActive={this.state.computerActive} >
                <Route exact path="/game/:instituteId" component={Network} />
                <Route path="/game/:instituteId/system" render={(props) => <SystemPanel {...props} computerActive={this.state.computerActive} hubConnection={this.state.hubConnection} />} />
            </Game>
            );
        //<Route path="/game/:instituteId/system" component={SystemPanel} />
    return (
        <>
            {content}
        </>
    );
  }
}
