import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService';
import { Row, Col, Container } from 'reactstrap';
import { System } from './System';


export class SystemPanel extends Component {

    static displayName = SystemPanel.name;

    constructor(props) {
        super(props);

        this.state = {

            System: this.props.location.state.system,
            instituteId: this.props.match.params.instituteId,
            loading: true,
            hover: false,
            active: false,

        };

        this.createOrderBuild = this.createOrderBuild.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.location.state.system.name != prevProps.location.state.system.name) {
            console.log("actualizando");
            this.setState({
                System: this.props.location.state.system
            });

        }

        // Uso tipico (no olvides de comparar los props):
        if (this.state.systemActive !== prevState.systemActive) {
            
        }
    }


    hover() {
        this.setState({
            hover: !this.state.hover,
        });
    }

    active() {
        this.setState({
            active: !this.state.active,
        });
    }

    style() {

        return {
            height: "200px",
            width: "100%",
            border: "3px solid black",
            borderRadius: "10px",
            backgroundColor: "#658ef652"
        };

    }

    render() {
        return (
            <div style={this.style()} >
                {this.state.System.name}
                <button className="btn btn-primary" onClick={this.createOrderBuild }>Actualizar</button>
            </div>
        );
    }

    createOrderBuild() {
        console.log(this.state.System.inGameId);
        fetch('game/createbuildorder?computerId=1&buildId=' + this.state.System.buildId)
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

}