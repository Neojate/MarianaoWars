import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService';
import { Row, Col, Button } from 'reactstrap';

export class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            instituteId: this.props.match.params.instituteId,
            computerId: this.props.computerActive.Id,
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

    async deleteAllMessages() {

        if (window.confirm('¿Deseas borrar todos los mensajes?')) {
            const response = await fetch(`/message/deleteallmessage?computerId=${this.state.computerId}`);
            await response;
            await this.sourceData(0);
        }

    }

    async deleteMessage(message) {

        if (window.confirm('¿Deseas borrar este mensaje?')) {
            const response = await fetch(`/message/deletemessage?messageId=${message.id}`);
            await response;
            await this.sourceData(0);
        }
    }

    async componentDidMount() {
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
                <Row>
                    <Col xs={3}>
                        <button onClick={() => this.sourceData(-1)}>Atrás</button>
                    </Col>
                    <Col xs={3}>
                        <button onClick={() => this.sourceData(1)}>Siguiente</button>
                    </Col>
                    <Col xs={6} className="text-right">
                        <Button onClick={() => this.deleteAllMessages()}>Borrar todos</Button>
                    </Col>
                </Row>
                
                
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

        fetch(`message/messages?computerId=${this.state.computerId}&pageIndex=${index}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    data: json,
                    pageIndex: index,
                    loading: false
                });
            });
    }

}