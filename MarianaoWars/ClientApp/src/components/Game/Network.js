import React, { Component } from 'react';

export class Network extends Component {

    constructor(props) {
        super(props);
        this.state = { broadcast: 40, data: [], loading: true };

        this.leftBroacast = this.moveBroadcast.bind(this);
    }

    componentDidMount() {
        this.sourceData(this.state.broadcast);
    }

    render() {
        let content = this.state.loading ?
            <p><label>Cargando...</label></p> :
            this.drawComputerTable();

        return (
            <div>
                <h2>192.168.0.{ this.state.broadcast }</h2>
                <div id="table">
                    {content}
                </div>
                <div>
                    <button onClick={ () => this.moveBroadcast(false) }>Izquierda</button>
                    <button onClick={ () => this.moveBroadcast(true) }>Derecha</button>
                </div>
            </div>
        );
    }

    drawComputerTable() {
        const items = [];

        for (var i = 0; i < 10; i++) {
            let ip = '192.168.' + i + '.' + this.state.broadcast;
            let computerName = '';
            for (var computer of this.state.data) {
                if (computer.IpDirection === ip)
                    computerName = computer.Name;
            }
            items.push(
                <tr>
                    <td>{ ip }</td>
                    <td>{computerName}</td>
                    <td></td>
                    <td>Acciones</td>
                </tr>
            );
        }

        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Dirección Ip</th>
                        <th>Nombre del Equipo</th>
                        <th>Propietario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { items }
                </tbody>
            </table>
        );
    }

    async sourceData(broadcast) {
        fetch('intranet/computers?instituteId=1&broadcast=' + broadcast)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    data: json,
                    loading: false
                });
            });
    }

    moveBroadcast(goingFoward) {
        this.state.broadcast += 1 * goingFoward ? 1 : -1;

        if (this.state.broadcast < 0)
            this.state.broadcast = 49;
        else if (this.state.broadcast > 49)
            this.state.broadcast = 0;
        
        this.sourceData(this.state.broadcast);
    }

}