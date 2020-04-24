import React, { Component } from 'react';

export class Panel extends Component {
    static displayName = Panel.name;

    constructor(props) {
        super(props);

        this.metodo = this.metodo.bind(this);
        this.state = {
            active: false
        };

    }

    metodo() {
        this.setState({
            active: !this.state.active,
        });
    }

    stylePanel() {
        return {
            backgroundColor: (this.state.active) ? 'rgba(0, 255, 255, 0.39)' : 'rgba(255, 255, 255, 0.39)',
            border: '1px solid black',
            height: '100px'
        }
    }

    render() {
        return (
            <div>
                <div className="container-fluid" style={this.stylePanel()} onMouseEnter={this.metodo} onMouseOut={this.metodo}>
                    
                </div>
            </div>
        );
    }
}
