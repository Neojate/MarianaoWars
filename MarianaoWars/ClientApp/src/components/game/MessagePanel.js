import React, { Component } from 'react';

export class MessagePanel extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            message: this.props.location.state.message
        };
    }

    componentDidMount() {
        if (!this.state.message.isRead) {
            fetch(`/message/messagereaded?messageId=${this.state.message.id}`);
        }
    }

    render() {
        return (
            <div className="box">
                <h2>{this.state.message.title}</h2>
                <div className="row">
                    <div className="col-6">
                        <span>Emisor: { this.state.message.sendFrom }</span>
                    </div>
                    <div className="col-6 text-right">
                        <span>Fecha: { this.state.message.date }</span>
                    </div>
                </div>
                <hr />
                <div className="message">
                    { this.state.message.body }
                </div>
            </div>
        );
    }

}