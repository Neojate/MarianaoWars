import React, { Component } from 'react';
import { Row, Col, Input } from 'reactstrap';

export class ExpeditionPanel extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

        };
    }

    componentDidMount() {

    }

    scripts() {
        return (
            <Col xs={4}>
                <Row className="align-items-center">
                    <Col xs={5}>
                        <img alt="img" src={require(`../../images/icon/61.png`)} />
                    </Col>
                    <Col xs={7}>
                        <Input type="number" innerRef={name => this.inputName = name} placeholder="" />
                    </Col>
                </Row>
            </Col>
        );
    }

    render() {
        return (
            <div className="box box-expeditions">
                <h2>Expedición</h2>
                <Row className="box-scripts">
                    <Col className="box-attack" xs={12}>
                        <h4>Ataque</h4>
                        <Row>
                            {this.scripts()}
                            {this.scripts()}
                            {this.scripts()}
                        </Row>
                    </Col>
                    <Col className="box-deffense" xs={12}>
                        <h4>Defensa</h4>
                        <Row>
                            {this.scripts()}
                            {this.scripts()}
                            {this.scripts()}
                            {this.scripts()}
                            {this.scripts()}
                        </Row>
                    </Col>
                </Row>
                <hr />
                
            </div>
        );
    }

}