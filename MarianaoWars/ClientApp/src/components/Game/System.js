import React, { Component } from 'react';
import { Col } from 'reactstrap';


export class System extends Component {

    static displayName = System.name;

    constructor(props) {
        super(props);

        this.hover = this.hover.bind(this);
        this.active = this.active.bind(this);

        this.state = {
            Id: 0,
            Name: '',
            Description: '',
            LastVersion: 0,
            Increment: [],
            Sleep: [],

            loading: true,
            hover: false,
            active: false,

        };
    }

    componentDidMount() {

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

    systemStyle() {

        let border= "1px solid black";
        let backgroundColor= "#f0ff73";
        let colors = {
            border: "1px solid black",
            backgroundColor: "#f0ff73"
        }

        if (this.state.active) {
            border = "1px solid red";
            backgroundColor = "#ffc107";
        }
        else if (this.state.hover){
            border = "1px solid red";
            backgroundColor = "#f0ff73";
        }

        return {
            height: "80px",
            width: "80px",
            margin: "auto",
            border: border,
            backgroundColor: backgroundColor
        };

    }




    render() {

        return (

                //añadir aqui sub nav segun click.

            <Col xs={2} onClick={this.props.onClick}>
                    <div style={this.systemStyle()} onMouseEnter={this.hover} onMouseOut={this.hover} onClick={this.active} >
                    
                     </div>
                </Col>


        );
    }

}