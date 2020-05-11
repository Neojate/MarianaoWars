import React, { Component } from 'react';
import { Progress, Row, Col, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export class Resource extends Component {

    static displayName = Resource.name;

    constructor(props) {
        super(props);

        this.state = {
            popoverOpen: false,
        };

        this.toogle = this.toogle.bind(this);
    }

    toogle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        return (
            <Col id={this.props.id} xs="1">
                <Row>
                    <Col xs="4">
                        <img onMouseEnter={this.toogle} onMouseOut={this.toogle} /*onClick={this.toogle}*/ style={{ maxWidth: '16px' }} src={require('../../images/' + this.props.image)} alt={"resource"}/>
                    </Col>
                    <Col xs="8">
                        <p>{~~this.props.quantity}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Progress style={{ height: '0.5rem' }} color={this.props.color} value={this.props.value} />
                    </Col>
                </Row>
                <Popover trigger="focus" placement="bottom" isOpen={this.state.popoverOpen} target={this.props.id}>
                    <PopoverHeader>{this.props.popoverHeader}</PopoverHeader>
                    <PopoverBody>
                        {this.props.popoverBody}
                    </PopoverBody>
                </Popover>
            </Col>
        );
    }

}