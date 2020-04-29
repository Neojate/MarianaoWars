import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { System } from './System';
import $ from "jquery";


export class NavSystems extends Component {

    static displayName = NavSystems.name;

    constructor(props) {
        super(props);

        //this.sistemActive = this.sistemActive.bind(this, id);

        this.state = {
            
        };
    }

    componentDidMount() {
        
    }

    navStyle() {
        return {
            position: "absolute",
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
            position: "absolute",
            bottom: "130px",
            right: "5px",
            left: "5px",
            height: "120px",
            backgroundColor: "#4e0fc8c2",
            border: "1px solid black"
        }
    }

    sistemActive(id) {

        console.log(id);
        $('.sub-nav').show("fast");
    }


    render() {

        return (

            <>
            <Row style={this.subNavStyle()} className={"align-items-center sub-nav"}>
                <System />
                <System />
                <System />
                <System />
                <System />
                <System />
            </Row>

                <Row style={this.navStyle()} className={"d-flex align-items-center"} >
                    <System onClick={this.sistemActive.bind(this, 1)}/>
                    <System onClick={this.sistemActive.bind(this, 2)}/>
                    <System onClick={this.sistemActive.bind(this, 3)}/>
                    <System onClick={this.sistemActive.bind(this, 4)}/>
                    <System onClick={this.sistemActive.bind(this, 5)}/>
                    <System onClick={this.sistemActive.bind(this, 6)}/>
            </Row>
            </>
        );
    }

}