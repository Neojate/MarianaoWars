import React, { Component } from 'react';
import { Col } from 'reactstrap';

export class System extends Component {

    static displayName = System.name;

    constructor(props) {
        super(props);

        this.hover = this.hover.bind(this);
        this.active = this.active.bind(this);

        this.state = {

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

        let border = "1px solid black";
        //let backgroundColor = "#f0ff73";

        if (this.state.active) {
            border = "1px solid red";
            //backgroundColor = "#ffc107";
        }
        else if (this.state.hover){
            border = "1px solid red";
            //backgroundColor = "#f0ff73";
        }

        return {
            border: border,
            //backgroundColor: backgroundColor
        };

    }




    render() {

        let img = '';
        if (this.props.buildId !== undefined) {
            img = <img alt="system" src={require(`../../images/icon/${this.props.buildId}.png`)}></img>
        }

        return (

                //añadir aqui sub nav segun click.
            <div style={this.systemStyle()} className={"system"} onMouseEnter={this.hover} onMouseOut={this.hover} onClick={this.props.onClick} >
                {img}
            </div>
            /*
            <Col xs={2} onClick={this.props.onClick} >
                <div style={this.systemStyle()} className={"system"} onMouseEnter={this.hover} onMouseOut={this.hover} onClick={this.active} >
                    {img}
                 </div>
            </Col>
            */


        );
    }

}