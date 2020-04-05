import React, { Component } from 'react'
import authService from './api-authorization/AuthorizeService';
import $ from "jquery"

export class InstitutePanel extends Component {

    constructor() {
        super();
        this.state = { data: [], loading: true };
    }

    handleClick(institute) {
        let data = {
            'instituteId': institute.id,
            'userId': this.state.userId
        }
        $.get('/institutes/hasenrollment', data, (receivedData) => {
            if (receivedData) {
                if (!window.confirm('¿Deseas matricularte en el instituto ' + institute.name + '?')) return;
                $.get('institutes/createenrollment', data, () => {
                    alert('Te has matriculado con éxito.');
                });                 
            } else {
                alert('Entrando en partida...');
            }
        });
    }
        
    drawInstituteTable(institutes) {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Ratio Tiempo</th>
                        <th>Otro ratio</th>
                        <th>Fecha de inicio</th>
                    </tr>
                </thead>
                <tbody>
                    {institutes.map(institute =>
                        <tr onClick={() => this.handleClick(institute)}>
                            <td>{institute.name}</td>
                            <td>{institute.rateTime}x</td>
                            <td>{institute.rateCost}x</td>
                            <td>{institute.initDate}</td>
                        </tr>    
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let content = this.state.loading ?
            <p><emp>Loading...</emp></p> :
            this.drawInstituteTable(this.state.data);
        return (
            <div>
                <p>Lista de los servidores activos</p>
                {content}
            </div>    
        )
    }

    componentDidMount() {
        this.sourceData();
        this.populateState();
    }

    async sourceData() {
        fetch('institutes/openinstitutes')
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

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
        console.log(user.sub);
        this.setState({
            isAuthenticated,
            'userId': user.sub
        });
    }

    
}
