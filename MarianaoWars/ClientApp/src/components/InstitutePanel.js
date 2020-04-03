import React, { Component } from 'react'
import $ from "jquery"

export class InstitutePanel extends Component {

    constructor() {
        super();
        this.state = { data: [], loading: true };
    }

    handleClick(institute) {
        var data = {
            "instituteId": institute.id
        }
        $.get('/instituts/toinstitute', data, function () { });
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
                        <tr onClick={this.handleClick(institute)}>
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
    }

    async sourceData() {
        fetch('instituts/openinstitutes')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    data: json,
                    loading: false
                });
                console.log(json);
            });
    }

    
}
