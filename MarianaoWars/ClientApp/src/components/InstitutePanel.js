import React, { Component } from 'react'
import authService from './api-authorization/AuthorizeService';
import $ from "jquery";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";

export class InstitutePanel extends Component {

    constructor() {
        super();
        this.state = { data: [], loading: true };
    }

    handleClick(institute) {
        let data = {
            'instituteId': institute.id,
            'userId': this.state.userId
        };
        $.get('/institutes/hasenrollment', data, (hasEnrollment) => {
            if (!hasEnrollment) {
                if (!window.confirm('¿Deseas matricularte en el instituto ' + institute.name + '?')) return;
                $.get('institutes/createenrollment', data, () => {
                    alert('Te has matriculado con éxito.');
                });                 
            } else {
                alert('Entrando en partida...');
                this.props.history.push(`/game/${data.instituteId}`);
                //return <Redirect to='/game' />
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
                    {institutes.map((institute, index) =>

                            //<Link to={`/game/${institute.id}`}> {institute.name}</Link>
                            //{ institute.name }
                                    
                            <tr key={index} onClick={() => this.handleClick(institute)}>
                                <td>
                                    {institute.name}
                                </td>
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
            <p><label>Loading...</label></p> :
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
