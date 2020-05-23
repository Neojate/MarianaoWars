import React, { Component } from 'react';
import { Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { BuildIdName, ScriptTypes } from '../services/SystemConstants';
import { stringUtils } from '../services/Utils';

export class HackPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            computerActive: false,
            instituteId: false,
            institute: false,
            systemScripts: [],
            scriptQuantity: {},
            resources: {},
            type: false,
            ipIsValid: false,
            timeDistance: 0,
            needCoffee: 0
        };
        this.hackOrder = this.hackOrder.bind(this);
    }

    

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
        if (this.state.institute !== nextProps.institute) {
            this.setState({
                institute: nextProps.institute
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
                <Col xs={5}>
                    <Label>{name}</Label>
                </Col>
                <Col xs={7}>
                    {disabled ?
                        <Input type="number" defaultValue={0} name="{name}" id="{name}" innerRef={value => this.inputName = value} readOnly />
                        : <Input type="number" defaultValue={0} min={0} max={parseInt(this.state.computerActive.Resource[resource])} name="{name}" id="{name}" onChange={this.handleResourcesChange.bind(this, name, resource)} innerRef={value => this.inputName = value} /> 
                    }
                </Col>
            </Row>
            );
    }

    scriptsQuantityValue(scriptsObject) {

        let scripts = 0;
        for (const key in scriptsObject) {
            scripts += parseInt(scriptsObject[key]);
        }
        return scripts;
    }

    coffeToDistance(scriptsValue, distance) {

        console.log(scriptsValue);

        return scriptsValue * distance * 10;

    }



    handleScriptChange(index, event) {

        let scriptQuantityTemp = JSON.parse(JSON.stringify(this.state.scriptQuantity));
        let name = BuildIdName[index];
        scriptQuantityTemp[name] = event.target.value;

        let needCoffee = 0;
        if (this.inputTo.value.trim() !== '') {
            let distance = this.distanceToIp();
            needCoffee = this.coffeToDistance(this.scriptsQuantityValue(scriptQuantityTemp), distance);
        }

        this.setState({
            scriptQuantity: scriptQuantityTemp,
            needCoffee: needCoffee
        });
    }

    async handleActionChange(type, event) {
        
        this.setState({
            type: type
        });

        this.timeToIp();
        
    }

    handleResourcesChange(name, resource, event) {

        //se clona el array de los inputs rellenados
        let array = JSON.parse(JSON.stringify(this.state.resources));
        
        //se añade el valor del input actual
        array[name] = event.target.value;


        //si se intena añadir un numero por debajo de cero, se establece el 0
        if (event.target.value < 0) {
            event.target.value = 0;
        }
        
        //obtenemos los systems json y class
        let systemJson = this.state.systemScripts.find(element => element.name === 'Json');
        let systemClass = this.state.systemScripts.find(element => element.name === 'Class');

        //calculamos la capacidad máxima que podemos enviar
        let maxCapacity = 0;
        if (this.state.scriptQuantity['Json'] != undefined) {
            maxCapacity += parseInt(this.state.scriptQuantity['Json'] * systemJson.carry);
        }
        if (this.state.scriptQuantity['Class'] != undefined) {
            maxCapacity += parseInt(this.state.scriptQuantity['Class'] * systemClass.carry);
        }

        //se obtienen los recursos añadidos para enviar anteriormente, si es el primer que enviamos este sera 0
        let actualResource = 0;
        for (let index in array) {
            actualResource += parseInt(array[index]);
        }
        
        //Si la suma de inputs es mayor a la capacidad máxima, se establece el input en el máximo disponible
        if (actualResource > maxCapacity) {
            event.target.value = maxCapacity - (actualResource - event.target.value);
        }

        //Si el valor es o sigue siendo superior a los recursos que tenemos, se establece el máximo disponible como recursos del ordenador
        if (event.target.value > this.state.computerActive.Resource[resource]) {
            event.target.value = parseInt(this.state.computerActive.Resource[resource]);
        }
        
        //se añade el valor del input actual definitivo
        array[name] = event.target.value;
        
        //se guarda en el estado el array modificado
        this.setState({
            resources: array
        });
    }

    async handleIpToChange(ip, event) {
        this.timeToIp();
    }

    distanceToIp() {

        if (this.inputTo.value.trim() === '') {
            return 0;
        }

        let ip1 = stringUtils.ipToNumber(this.inputTo.value);
        let ip2 = stringUtils.ipToNumber(this.state.computerActive.IpDirection);
        let distance = Math.abs(ip1 - ip2);
        return distance;

    }

    /**
     * Verifica que la ip es correcta y añade el tiempo necesarios para el desplazamiento
     * */
    async timeToIp() {

        if (this.inputTo.value.trim() === '') {
            this.setState({
                ipIsValid: false,
                timeDistance: 0,
                needCoffee: 0
            });
            return;
        }

        let valid = await this.ipValid(this.state.instituteId, this.inputTo.value);
        if (valid) {

            let time = this.distanceToIp() * 60 * 1000 / this.state.institute.RateCost;
            let stringTime = stringUtils.timeToString(time);
            let needCoffee = this.coffeToDistance(this.scriptsQuantityValue(this.state.scriptQuantity), this.distanceToIp());

            this.setState({
                ipIsValid: true,
                timeDistance: stringTime,
                needCoffee: needCoffee
            })
        }
        else {
            this.setState({
                ipIsValid: false,
                timeDistance: 0,
                needCoffee: 0
            });
        }
    }

    async ipValid(instituteId, ip) {

        let result = await fetch(`game/iphascomputer?instituteId=${instituteId}&&ip=${ip}`);
        let response = await result.text();

        let condition1 = (this.state.type === ScriptTypes.ATTACK || this.state.type === ScriptTypes.SPY || this.state.type === ScriptTypes.TRANSPORT) && String(true).toLowerCase() === response.toLowerCase();
        let condition2 = (this.state.type === ScriptTypes.COLONIZADOR) && String(false).toLowerCase() === response.toLowerCase();

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
                                            <h5>Recursos necesarios</h5>
                                            <h6>Tiempo necesario</h6>
                                            {this.state.timeDistance !== 0 ? <p>{this.state.timeDistance}</p> : <p></p>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={10}>
                                            <h6>Gasto de café</h6>
                                            {this.state.needCoffee !== 0 ? <p>{this.state.needCoffee}</p> : <p></p>}
                                        </Col>
                                    </Row>

                                </Col>
                                <Col xs={6}>
                                    <Row>
                                        <Col xs={12}>
                                            <h5>Recursos a enviar</h5>
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

        for (let key in this.state.scriptQuantity) {
            data += `${key.toLowerCase()}=${this.state.scriptQuantity[key]}&&`;
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
            data += `coffee=${cafe}`;
        }

        let url = 'game/createhackorder';

        const response = await fetch(url + data);
        const responseJson = await response;

        console.log(responseJson);
       
    }

}