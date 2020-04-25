import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr';


export class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            message: '',
            messages: [],
            cuenta: 0,
            hubConnection: null,
        };
    }

    componentDidMount = () => {
        const nick = window.prompt('Your name:', 'John');

        const hubConnection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('SendMessege', (nick, receivedMessage) => {
                const text = `${nick}: ${receivedMessage}`;
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
            });

            this.state.hubConnection.on('nombreMetodoRecibido', (nick, receivedMessage) => {
                console.log(receivedMessage);
                const cuenta = `${receivedMessage}`;
                this.setState({ cuenta });
            });
        });
    };

    sendMessage = () => {
        this.state.hubConnection
            .invoke('SendMessege', this.state.nick, this.state.message)
            .catch(err => console.error(err));
        this.setState({ message: '' });
        this.initCount();
    };
    initCount = () => {
        this.state.hubConnection
            .invoke('InitCount', this.state.nick, this.state.message)
            .catch(err => console.error(err));
    };


    render() {
        return (
            <div>
                <br />
                <input
                    type="text"
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                />

                <button onClick={this.sendMessage}>Send</button>

                <div>
                    {this.state.messages.map((message, index) => (
                        <span style={{ display: 'block' }} key={index}> {message} </span>
                    ))}
                </div>
                <div>
                    {this.state.cuenta}
                </div>
            </div>
        );
    }
}
