import React, { Component } from 'react';

export class Prueba extends Component {
    static displayName = Prueba.name;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.prueballamada();
    }

    render() {
        return <div>hola prueba</div>
    }

    async prueballamada() {
        const response = await fetch('PruebaDb');
        const data = await response.json();
        console.log(data);
    }

    utildelocation() {
        var location = {
            key: '', // not with HashHistory!
            pathname: `/game/variable`,
            search: ``,
            hash: '',
            state: {key: 'objeto'}
        }
        //this.props.history.push(`/game/${data.instituteId}`);
        this.props.history.push(location);
        //return <Redirect to='/game' />
    }

}