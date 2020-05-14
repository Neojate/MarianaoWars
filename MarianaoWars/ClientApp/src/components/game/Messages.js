import React, { Component } from 'react';

export class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        };
    }

    render() {
        return <h1>Hola Eloy</h1>
    }

}