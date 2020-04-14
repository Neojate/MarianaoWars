import React, { Component } from 'react';
import { Resource } from './Resource';
import { Row } from 'reactstrap';


export class NavGame extends Component {

    static displayName = NavGame.name;

    constructor(props) {
        super(props);

        this.state = {
            systemResources: [],
            loading: true
        };

    }

    componentDidMount() {
        this.systemResourceData();
    }

    async systemResourceData() {
        const response = await fetch('systemresources');
        const data = await response.json();
        this.setState({ systemResources: data, loading: false });
    }

    static renderResources(systemResources) {

        return (
            <Row>
                {systemResources.map((value, index) => {

                    var qty = 60;
                    var color = qty < 80 ? "succes" : "danger";

                    return <Resource key={value.id}
                        id={`recurso${value.id}`}
                        image="iconResource1.png"
                        quantity="1025"
                        color={color}
                        value={qty}
                        popoverHeader={value.name}
                        popoverBody={value.description}
                    />
                })}
            </Row>
            );
    }

    render() {

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : NavGame.renderResources(this.state.systemResources);

        return (
            <div>
                {contents}
            </div>
        );
    }

}