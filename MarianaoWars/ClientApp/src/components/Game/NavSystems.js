import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { System } from './System';
import { Link } from 'react-router-dom';

import $ from "jquery";


export class NavSystems extends Component {

    static displayName = NavSystems.name;

    constructor(props) {
        super(props);

        //this.sistemActive = this.sistemActive.bind(this, id);
        this.state = {
            instituteId: this.props.instituteId,
            systemActive: -1,
            systems: this.props.system,
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.systems !== prevProps.systems) {
            this.setState({
                systems: this.props.systems
            })
        }
        
        // Uso tipico (no olvides de comparar los props):
        if (this.state.systemActive !== prevState.systemActive) {
            if (this.state.systemActive !== -1) {
                $('.sub-nav').show(500);
            }
        }
    }

    async sistemActive(id) {

        $('.sub-nav').hide(500);

        if (this.state.systemActive === id) {
            id = -1;
            await this.sleep(400);
        }
        this.setState({
            systemActive: id
        });

    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    drawSubMenu() {

        return (
            <Row>
                <Col xs={6} className="navsystem sub-nav d-flex justify-content-between align-items-center flex-wrap">
                {this.state.systems[this.state.systemActive].map((system, index) => {
                    return (
                        <Link key={index} to={{ pathname: `/game/${this.state.instituteId}/system`, state: { system: system, typeSystem: this.state.systemActive } }}>
                            <System key={index} buildId={system.buildId} />
                            </Link>
                    );
                })}
                </Col>
            </Row>
         );
    }


    draw() {
        return (
            
            <Row>
                <Col xs={6} className="navsystem d-flex justify-content-between align-items-center flex-wrap">
                    <System name={"resource"} system={this.state.systemResources} onClick={this.sistemActive.bind(this, 0)} />
                    <System onClick={this.sistemActive.bind(this, 2)} />
                    <System onClick={this.sistemActive.bind(this, 4)} />
                    <System onClick={this.sistemActive.bind(this, 6)} />
                    <System onClick={this.sistemActive.bind(this, 8)} />
                    <System onClick={this.sistemActive.bind(this, 10)} />
                </Col>
            </Row>
                
        );
    }


    render() {

        let nav = (this.state.systems !== undefined)
            ? this.draw()
            : '';

        let subnav = '';

        //Si tenemos un system activo y este tiene elementos, lo mostramos
        if (this.state.systemActive !== -1 && this.state.systems[this.state.systemActive] !== undefined) {
            subnav = this.drawSubMenu();
        }

        
        return (
            <>
              {subnav}
              {nav}
            </>
        );
    }

}