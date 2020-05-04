import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';

import knowledgeicon from '../../images/icon/knowledge-icon.png';
import ingenyousicon from '../../images/icon/ingenyous-icon.png';
import coffeeicon from '../../images/icon/coffee-icon.png';
import sleepicon from '../../images/icon/sleep-icon.png';

import '../../css/marianao_style.css';



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

        if (this.props.computerActive != prevProps.computerActive) {
            this.setState({
                computerActive: this.props.computerActive
            })
        }


        if (this.props.location.state.system.name != prevProps.location.state.system.name) {
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
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, .30)",
            backdropFilter: "blur(5px)"
        };

    }

    render() {
        return (
            <div className="box" >
                <h2>{this.state.System.name}</h2>
                <hr />
                <div className="icon-description">
                    {this.selectIcon(this.state.System.buildId)}
                    <p>{this.state.System.description}</p>
                </div>
                <hr />
                <div>
                    Nivel X de Y
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            Requisitos:
                        </div>
                        <div className="col-6">
                            <div>Conocimiento</div>
                            <div>Ingenio</div>
                            <div>Café</div>
                            <div>Descanso</div>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary center" onClick={this.createOrderBuild}>Actualizar</button>
                </div>
            </div>
        );
    }

    createOrderBuild() {
        fetch('game/createbuildorder?computerId=1&buildId=' + this.state.System.buildId)
            .then((response) => {});
    }

    selectIcon(id) {
        switch (id) {
            case 1: return <img src={knowledgeicon} />
            case 2: return <img src={ingenyousicon} />
            case 3: return <img src={coffeeicon} />
            case 4: return <img src={sleepicon} />
        }
    }

}