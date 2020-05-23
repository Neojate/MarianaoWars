import React, { Component } from 'react';

export class Network extends Component {


    constructor(props) {
        super(props);
        this.state = {
            broadcast: 40,
            computerActive: false,
            data: [],
            loading: true,
            instituteId: props.match.params.instituteId
        };
        
        this.moveBroadcast = this.moveBroadcast.bind(this);

    }

    componentWillReceiveProps(nextProps) {

        if (this.state.computerActive.IpDirection !== nextProps.computerActive.IpDirection) {

            let broadcast = nextProps.computerActive.IpDirection.split('.')[3];

            this.setState({
                computerActive: nextProps.computerActive,
                broadcast: broadcast
            })
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.state.broadcast !== prevState.broadcast) {
            this.sourceData(this.state.broadcast);
        }
        
    }

    componentDidMount() {
        //this.sourceData(this.state.broadcast);
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
                <tr key={i}>
                    <td>{ ip }</td>
                    <td>{ computerName }</td>
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
        
        let response = await fetch('intranet/computers?instituteId=' + this.state.instituteId + '&broadcast=' + broadcast);
        let result = await response.json();

        this.setState({
            data: result,
            loading: false
        });
    }

    moveBroadcast(goingFoward) {

        let value = goingFoward ? 1 : -1;
        this.setState({broadcast: parseInt(this.state.broadcast) + value });
        
        if (this.state.broadcast < 0) {
            this.setState({ broadcast: 49 });
        }
        else if (this.state.broadcast > 49) {
            this.setState({ broadcast: 0 });
        }
    }

}