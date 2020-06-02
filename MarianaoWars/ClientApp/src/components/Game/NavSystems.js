import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { System } from './System';
import { Link } from 'react-router-dom';
import { SystemsType, ScriptTypes } from '../services/SystemConstants';

import $ from "jquery";


export class NavSystems extends Component {

    static displayName = NavSystems.name;

    constructor(props) {
        super(props);

        this.state = {
            instituteId: this.props.instituteId,
            systemActive: -1,
            systems: this.props.system,
            buildId: 0,
        };
        this.sleep = this.sleep.bind(this);
    }

    componentDidMount() { }

    componentWillReceiveProps(nextProps) {

        if (this.state.systems !== nextProps.systems) {
            this.setState({
                systems: nextProps.systems
            })
        }
        if (this.state.instituteId !== nextProps.instituteId) {
            this.setState({
                instituteId: nextProps.instituteId
            })
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.systems !== prevProps.systems) {
            this.setState({
                systems: this.props.systems
            })
        }

        // Uso tipico (no olvides de comparar los props):
        if (this.state.systemActive !== prevState.systemActive) {
            if (this.state.systemActive !== -1) {
                $('.sub-nav').addClass('show');
            }
        }
    }

    async sistemActive(id) {

        $('.sub-nav').removeClass('show');
        await this.sleep(700);


        if (this.state.systemActive === id) {
            id = -1;
        }
        this.setState({
            systemActive: id
        });

    }

    async boxChange(buildId) {

        console.log("build", buildId);
        console.log("thisbuild", this.state.buildId);

        if (buildId == this.state.buildId) {
            return;
        }
        else if (this.state.buildId < buildId) {
            if ($('.box').hasClass("box-in-right")) {
                $('.box').removeClass("box-in-right");
            }
            $('.box').addClass('box-out-left');
            await new Promise(resolve => setTimeout(resolve, 1000));
            $('.box').removeClass('box-out-left');
            $('.box').addClass('box-in-left');

        }
        else {
            if ($('.box').hasClass("box-in-left")) {
                $('.box').removeClass("box-in-left");
            }
            $('.box').addClass('box-out-right');
            await new Promise(resolve => setTimeout(resolve, 1000));
            $('.box').removeClass('box-out-right');
            $('.box').addClass('box-in-right');
        }

        this.setState({ buildId: buildId });
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    subMenuSystems() {
        return (
            <Col xs={6} className="navsystem sub-nav d-flex justify-content-between align-items-center flex-wrap">
                {this.state.systems[this.state.systemActive].map((system, index) => {
                    return (
                        <Link onClick={this.boxChange.bind(this, system.buildId)} key={index} to={{ pathname: `/game/${this.state.instituteId}/system`, state: { system: system, typeSystem: this.state.systemActive } }}>
                            <System key={index} buildId={system.buildId} />
                        </Link>
                    );
                })}
            </Col>);
    }

    subMenuScript() {

        const atackScript = this.state.systems[this.state.systemActive].filter(script => script.type === ScriptTypes.ATTACK);
        const defenseScript = this.state.systems[this.state.systemActive].filter(script => script.type !== ScriptTypes.ATTACK);

        return (
            <Col xs={6} className="navsystem sub-nav d-flex justify-content-center align-items-center flex-wrap">
                <Row className="w-100">
                    <Col xs={5} className="atack-script d-flex justify-content-between align-items-center">
                        {atackScript.map((system, index) => {
                            return (
                                <Link key={index} to={{ pathname: `/game/${this.state.instituteId}/system`, state: { system: system, typeSystem: this.state.systemActive } }}>
                                    <System key={index} buildId={system.buildId} />
                                </Link>
                            );
                        })}
                    </Col>
                    <Col xs={7} className="defense-script d-flex justify-content-between align-items-center">
                        {defenseScript.map((system, index) => {
                            return (
                                <Link key={index} to={{ pathname: `/game/${this.state.instituteId}/system`, state: { system: system, typeSystem: this.state.systemActive } }}>
                                    <System key={index} buildId={system.buildId} />
                                </Link>
                            );
                        })}
                    </Col>
                </Row>
            </Col>

        );
    }


    drawSubMenu() {

        return (
            <Row>
                {this.state.systemActive === SystemsType.SCRIPT ? this.subMenuScript() : this.subMenuSystems()}
            </Row>
        );
    }


    draw() {
        return (

            <Row>
                <Col xs={6} className="navsystem d-flex justify-content-between align-items-center flex-wrap">
                    <System buildId={"p1icon"} name={"resource"} system={this.state.systemResources} onClick={this.sistemActive.bind(this, SystemsType.RESOURCE)} />
                    <System buildId={"p2icon"} onClick={this.sistemActive.bind(this, SystemsType.SOFTWARE)} />
                    <System buildId={"p3icon"} onClick={this.sistemActive.bind(this, SystemsType.TALENT)} />
                    <System buildId={"p4icon"} onClick={this.sistemActive.bind(this, SystemsType.SCRIPT)} />
                    <Link to={{ pathname: `/game/${this.state.instituteId}/hackorder` }}>
                        <System buildId={"p5icon"} />
                    </Link>
                    <System buildId={"p6icon"} onClick={this.sistemActive.bind(this, 10)} />
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