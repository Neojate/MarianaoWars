﻿import React, { Component } from 'react';
import { Row, Col, Input, Label, FormGroup, Form, FormFeedback } from 'reactstrap';
import { SystemsType, ScriptTypes, BuildIdName } from '../services/SystemConstants'

export class HackPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            computerActive: false,
            instituteId: false,
            systemScripts: [],
            scriptQuantity: [],
            resources: [],
            type: false,
            ipIsValid: true
        };
        this.hackOrder = this.hackOrder.bind(this);
    }

    componentDidMount() { }

    componentWillReceiveProps(nextProps) {
        if (this.state.computerActive !== nextProps.computerActive) {
            this.setState({
                computerActive: nextProps.computerActive
            })
        }
        if (this.state.instituteId !== nextProps.instituteId) {
            this.setState({
                instituteId: nextProps.instituteId
            })
        }
        if (this.state.systemScripts !== nextProps.systemScripts) {
            this.setState({
                systemScripts: nextProps.systemScripts
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


        if (this.props.systemScripts !== prevProps.systemScripts) {
            this.setState({
                systemScripts: this.props.systemScripts
            })
        }
        
        
        
    }

    scripts(scriptType) {

        let scripts = [];
        if (scriptType === ScriptTypes.ATTACK) {
            scripts = this.state.systemScripts.filter(script => script.type === scriptType);
        }
        else {
            scripts = this.state.systemScripts.filter(script => script.type !== ScriptTypes.ATTACK && script.type !== ScriptTypes.DEFENSE);
        }

        return (

            scripts.map((script, index) => {

                let maxQuantity = this.state.computerActive.Script[BuildIdName[script.buildId]];

                return (
                    <Col key={index} xs={4}>
                        <Row className="align-items-center">
                            <Col xs={5}>
                                <img alt="img" src={require(`../../images/icon/${script.buildId}.png`)} />
                            </Col>
                            <Col xs={7}>
                                <Input type="number" min="0" max={maxQuantity}
                                    onChange={this.handleScriptChange.bind(this, script.buildId)}
                                    innerRef={script => this.inputName = script}
                                    placeholder=""
                                    defaultValue={0} />
                            </Col>
                        </Row>
                    </Col>
                );
            })

        );
    }



    actions(name, type) {
        return (
            <FormGroup check>
                <Label check>
                    <Input type="radio" name="actions" onClick={this.handleActionChange.bind(this, type)} />{' '}
                    {name}
                </Label>
            </FormGroup>
        );
    }

    recursos(name, resource) {

        let disabled = (this.state.type === ScriptTypes.COLONIZADOR || this.state.type === ScriptTypes.TRANSPORT) ? false : true;

        return (
            <Row>
                <Col xs={7}>
                    <Label>{name}</Label>
                </Col>
                <Col xs={5}>
                    {disabled ?
                        <Input type="number" defaultValue={0} name="{name}" id="{name}" innerRef={value => this.inputName = value} readOnly />
                        : <Input type="number" defaultValue={0} min={0} max={parseInt(this.state.computerActive.Resource[resource])} name="{name}" id="{name}" onChange={this.handleResourcesChange.bind(this, name, resource)} innerRef={value => this.inputName = value} /> 
                    }
                </Col>
            </Row>
            );

    }

    handleScriptChange(index, event) {

        let array = this.state.scriptQuantity.slice();
        let name = BuildIdName[index];
        array[name] = event.target.value;

        this.setState({
            scriptQuantity: array
        });
    }

    async handleActionChange(type, event) {
        this.setState({
            type: type
        });

        if (this.inputTo !== undefined) {
            let valid = await this.ipValid(this.state.instituteId, this.inputTo.value);
            valid ? this.setState({ ipIsValid: true }) : this.setState({ ipIsValid: false });
        }
        
    }

    handleResourcesChange(name, resource, event) {

        if (event.target.value < 0) {
            event.target.value = 0;
        }
        
        let systemJson = this.state.systemScripts.find(element => element.name === 'Json');
        let systemClass = this.state.systemScripts.find(element => element.name === 'Class');

        let maxCapacity = 0;
        if (this.state.scriptQuantity['Json'] != undefined) {
            maxCapacity += parseInt(this.state.scriptQuantity['Json'] * systemJson.carry);
        }
        if (this.state.scriptQuantity['Class'] != undefined) {
            maxCapacity += parseInt(this.state.scriptQuantity['Class'] * systemClass.carry);
        }

        let actualResource = 0;
        for (let index in this.state.resources) {
            actualResource += parseInt(this.state.resources[index]);
        }
        console.log("actualResValue", actualResource);


        console.log("actualRes", this.state.resources);

        if (actualResource > maxCapacity) {
            event.target.value = maxCapacity - actualResource;
        }

        if (event.target.value > this.state.computerActive.Resource[resource]) {
            event.target.value = parseInt(this.state.computerActive.Resource[resource]);
        }

        let array = this.state.resources.slice();
        console.log("arary", this.state.resources.slice());
        array[name] = event.target.value;
        

        this.setState({
            resources: array
        });
        console.log("arary", this.state.resources.slice());
    }

    async handleIpToChange(ip, event) {

        let valid = await this.ipValid(this.state.instituteId, ip.value);
        valid ? this.setState({ ipIsValid: true }) : this.setState({ ipIsValid: false });

    }

    async ipValid(instituteId, ip) {

        let result = await fetch('game/iphascomputer', { instituteId: instituteId, ip: ip });
        let response = await result.text();

        let condition1 = (this.state.type === ScriptTypes.ATTACK || this.state.type === ScriptTypes.SPY) && String(true).toLowerCase() === response.toLowerCase();
        let condition2 = (this.state.type === ScriptTypes.COLONIZADOR || this.state.type === ScriptTypes.TRANSPORT) && String(false).toLowerCase() === response.toLowerCase();

        if (condition1 || condition2) {
            return true;
        }
        else {
            return false
        }

    }

    render() {
        
        if (this.state.computerActive === false || this.state.systemScripts == undefined || this.state.systemScripts.length === 0) {
            return '';
        }

        return (
            <Form onSubmit={this.hackOrder} ref='hackForm'>
                <div className="box box-hacks">
                    <Row className="box-scripts">
                        <Col className="box-attack" xs={12}>
                            <Row>
                                {this.scripts(ScriptTypes.ATTACK)}
                                {this.scripts(null)}
                            </Row>
                        </Col>
                    </Row>
                    <hr className="mt-2 mb-2" />
                    <Row className="box-scripts">
                        <Col className="box-attack" xs={12}>
                            <Row>
                                <Col xs={6}>
                                    <Label for="fromHack"><b>Desde</b></Label>
                                    <Input type="text" defaultValue={this.state.computerActive.IpDirection} name="from" id="fromHack" readOnly />
                                </Col>
                                <Col xs={6}>
                                    <Label for="exampleSelect"><b>Hasta</b></Label>
                                    {this.state.ipIsValid ? 
                                        <Input type="text" name="to" id="to" onBlur={this.handleIpToChange.bind(this, this.inputTo)} innerRef={to => this.inputTo = to} placeholder="192.168.0.0" />
                                        : <Input type="text" name="to" id="to" onBlur={this.handleIpToChange.bind(this, this.inputTo)} innerRef={to => this.inputTo = to} placeholder="192.168.0.0" invalid/>
                                    }
                                    <FormFeedback>La Ip no es valida para esta acción</FormFeedback>
                                </Col>
                                <Col xs={12} className="d-flex justify-content-around mt-3">
                                    {this.actions('Atacar', ScriptTypes.ATTACK)}
                                    {this.actions('Colonizar', ScriptTypes.COLONIZADOR)}
                                    {this.actions('Espiar', ScriptTypes.SPY)}
                                    {this.actions('Transportar', ScriptTypes.TRANSPORT)}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <hr className="mt-2 mb-2" />
                    <Row className="box-scripts">
                        <Col className="box-attack" xs={12}>
                            <Row>
                                <Col xs={6}>
                                    <Row>
                                        <Col xs={10}>
                                            <Label>Tiempo necesario</Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={10}>
                                            <Label>Gasto de café</Label>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col xs={6}>
                                    <Row>
                                        <Col xs={12}>
                                            <Label>Recursos</Label>
                                        </Col>
                                    </Row>
                                    {this.recursos('Conocimiento', BuildIdName[1])}
                                    {this.recursos('Imaginacion', BuildIdName[2])}
                                    {this.recursos('Cafe', BuildIdName[3])}
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Col xs={12}>
                        {this.state.ipIsValid ? 
                            <button type='submit' className='btn btn-primary'>Send</button>
                            : <button type='submit' className='btn btn-primary' disabled>Send</button>
                        }
                        
                    </Col>


                </div>
            </Form>
        );
    }

    async hackOrder(event) {

        event.preventDefault();
        console.log('event', event);
        console.log('this', this);

        let data = '?';

        for (let value in this.state.scriptQuantity) {
            data += `${value.toLowerCase()}=${this.state.scriptQuantity[value]}&&`;
        }
        //from
        data += `computerId=${this.state.computerActive.Id}&&`

        //to
        data += `to=${this.inputTo.value}&&`

        //type
        data += `type=${this.state.type}&&`

        //instituteid
        data += `instituteId=${this.state.instituteId}`

        //resource
        if (this.state.type === ScriptTypes.COLONIZADOR || this.state.type === ScriptTypes.TRANSPORT) {

            let conocimiento = (this.state.resources["Conocimiento"] !== undefined) ? this.state.resources["Conocimiento"] : 0;
            let imaginacion = (this.state.resources["Imaginacion"] !== undefined) ? this.state.resources["Imaginacion"] : 0;
            let cafe = (this.state.resources["Cafe"] !== undefined) ? this.state.resources["Cafe"] : 0;

            data += `&&knowledge=${conocimiento}&&`;
            data += `ingenyous=${imaginacion}&&`;
            data += `coffe=${cafe}`;
        }

        let url = 'game/createhackorder';

        const response = await fetch(url + data);
        const responseJson = await response;

        console.log(responseJson);
       
    }

}