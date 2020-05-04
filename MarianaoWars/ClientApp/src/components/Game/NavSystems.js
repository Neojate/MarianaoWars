import React, { Component } from 'react';
import { Row } from 'reactstrap';
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
            systemActive: 0,
            systems: this.props.system,
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.systems != prevProps.systems) {
            this.setState({
                systems: this.props.systems
            })
        }
        
        // Uso tipico (no olvides de comparar los props):
        if (this.state.systemActive !== prevState.systemActive) {
            if (this.state.systemActive != 0) {
                $('.sub-nav').show(500);
            }
        }
    }

    navStyle() {
        return {
            position: "fixed",
            bottom: "5px",
            right: "5px",
            left: "5px",
            height: "120px",
            backgroundColor: "#4e0fc8c2",
            border: "1px solid black"
        }
    }

    subNavStyle() {
        return {
            display: "none",
            position: "fixed",
            bottom: "130px",
            right: "5px",
            left: "5px",
            height: "120px",
            backgroundColor: "#4e0fc8c2",
            border: "1px solid black"
        }
    }

    async sistemActive(id) {

        $('.sub-nav').hide(500);

        if (this.state.systemActive == id) {
            id = 0;
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
            <Row style={this.subNavStyle()} className={"align-items-center sub-nav"}>
                {this.state.systems[this.state.systemActive].map((system, index) => {
                    return (
                        <Link key={index} to={{ pathname: `/game/${this.state.instituteId}/system`, state: { system: system } }}>
                            <System key={index} />
                        </Link>
                        
                    );
                })}
            </Row>
         );
    }


    draw() {
        return (
                <Row style={this.navStyle()} className={"d-flex align-items-center"} >
                    <System name={"resource"} system={this.state.systemResources} onClick={this.sistemActive.bind(this, 1)} />
                    <System onClick={this.sistemActive.bind(this, 2)} />
                    <System onClick={this.sistemActive.bind(this, 3)} />
                    <System onClick={this.sistemActive.bind(this, 4)} />
                    <System onClick={this.sistemActive.bind(this, 5)} />
                    <System onClick={this.sistemActive.bind(this, 6)} />
                </Row>            
        );
    }


    render() {

        let nav = (this.state.systems != undefined)
            ? this.draw()
            : '';

        let subnav = '';

        //Si tenemos un system activo y este tiene elementos, lo mostramos
        if (this.state.systemActive != 0 && this.state.systems[this.state.systemActive] != undefined) {
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