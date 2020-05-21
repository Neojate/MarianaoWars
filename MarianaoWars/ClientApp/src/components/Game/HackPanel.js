import React, { Component } from 'react';
import { Row, Col, Input, Label, FormGroup, Form } from 'reactstrap';
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

    recursos(name) {

        let disabled = (this.state.type === ScriptTypes.COLONIZADOR || this.state.type === ScriptTypes.TRANSPORT) ? false : true;

        return (
            <Row>
                <Col xs={7}>
                    <Label>{name}</Label>
                </Col>
                <Col xs={5}>
                    {disabled ?
                        <Input type="number" defaultValue={0} name="{name}" id="{name}" innerRef={value => this.inputName = value} readOnly />
                        : <Input type="number" defaultValue={0} name="{name}" id="{name}" onChange={this.handleResourcesChange.bind(this, name)} innerRef={value => this.inputName = value} /> 
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

    handleActionChange(type, event) {
        this.setState({
            type: type
        });
    }

    handleResourcesChange(name, event) {
        let array = this.state.resources.slice();
        array[name] = event.target.value;

        this.setState({
            resources: array
        });
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
                                    <Input type="text" name="to" id="to" innerRef={to => this.inputTo = to} placeholder="192.168.0.0"></Input>
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
                                    {this.recursos('Conocimiento')}
                                    {this.recursos('Imaginacion')}
                                    {this.recursos('Cafe')}
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Col xs={12}>
                        <button type='submit' className='btn btn-primary'>Send</button>
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
        data += `from=${this.state.computerActive.Id}&&`

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

        let url = 'createhackorder';

        const response = await fetch(url + data);
        const responseJson = await response;

        console.log(responseJson);
       
    }

}