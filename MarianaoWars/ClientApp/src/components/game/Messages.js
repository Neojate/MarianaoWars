﻿import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService';

export class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            instituteId: this.props.match.params.instituteId,
            userId: this.props.userId,
            pageIndex: 1,
            loading: true,
        };
    }

    handleClick(message) {
        var location = {
            key: 'ac3df4',
            pathname: `/game/${this.state.instituteId}/message`,
            search: '',
            hash: '',
            state: {
                ['message']: message
            }
        };
        this.props.history.push(location);
    }

    async deleteMessage(message) {

        if (window.confirm('¿Deseas borrar este mensaje?')) {
            const response = await fetch(`/message/deletemessage?messageId=${message.id}`);
            await response;
            await this.sourceData(0);
        }
    }

    async componentDidMount() {
        await this.getUser();
        await this.sourceData(0);
    }

    render() {
        let content = this.state.loading ?
            <p><label>Cargando...</label></p> :
            this.drawMessagesTable(this.state.data);
        return (
            <div>
                { content }
            </div>
        );
    }

    drawMessagesTable(messages) {
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Desde</th>
                            <th>Titulo</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message, index) => 
                            <tr key={index} className={message.isRead ? '' : 'notreaded'}>
                                <td onClick={() => this.handleClick(message)}>{message.date}</td>
                                <td onClick={() => this.handleClick(message)}>{message.sendFrom}</td>
                                <td onClick={() => this.handleClick(message)}>{message.title}</td>
                                <td><span onClick={() => this.deleteMessage(message)}><img src={require('../../images/icon/deleteicon.png')} className="link" /></span></td>
                            </tr>  
                        )}
                    </tbody>
                </table>
                <button onClick={() => this.sourceData(-1)}>Atrás</button>
                <button onClick={() => this.sourceData(1)}>Siguiente</button>
            </div>
        );
    }

    async sourceData(dir) {
        
        let index = this.state.pageIndex + dir;
        if ((index - 1) * 10 > this.state.data.length) {
            index = this.state.pageIndex;
        }
        if (index <= 0) {
            index = 1
        }

        fetch(`message/messages?instituteId=${this.state.instituteId}&userId=${this.state.userId}&pageIndex=${index}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log(json);
                this.setState({
                    data: json,
                    pageIndex: index,
                    loading: false
                });
            });
    }

    async getUser() {
        const user = await authService.getUser();
        this.setState({
            'userId': user.sub
        });
    }

}