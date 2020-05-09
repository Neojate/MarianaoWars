import React, { Component } from 'react';
import { Resource } from './Resource';
import { Row, Col, Container } from 'reactstrap';
import { Link } from 'react-router-dom';


export class NavGame extends Component {

    static displayName = NavGame.name;

    constructor(props) {
        super(props);

        this.state = {
            systemResources: [],
            userId: this.props.userId,
            instituteId: this.props.instituteId,
            computer: this.props.computer,
            systems: []
        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.computer != prevProps.computer) {
            this.setState({
                computer: this.props.computer
            })
        }
        if (this.props.systemResources != prevProps.systemResources) {
            this.setState({
                systemResources: this.props.systemResources
            })
        }
        if (this.props.systems != prevProps.systems) {
            this.setState({
                systems: this.props.systems
            })
        }
    }

    componentDidMount() {
        
    }

    colorProgress(value, maxValue) {

        let fraccion = maxValue / 3;
        let color = "";

        if (value < fraccion) {
            color = "success";
        }
        else if (value >= fraccion && value <= fraccion * 2) {
            color = "warning";
        }
        else {
            color = "danger";
        }

        return color;

    }

    renderResources(systems, computer) {

        if (systems.length == 0) {
            return "";
        }

        return (
            <Container>
            <Row style={{ alignItems: 'center' }}>
                {systems[1].map((systemResource, index) => {

                    //TODO: Buscar otra manera de obtener el dato, que no sea hardcode
                    //Obtenemos array de valores máximos de capacidad
                    let action1 = systems[2][1].action1.split(",");
                    let capacity = action1[computer.Software.MySqlVersion];
                    let quantity = 0;

                    switch (systemResource.buildId) {

                        case 1:
                            quantity = computer.Resource.Knowledge;
                            break

                        case 2:
                            quantity = computer.Resource.Ingenyous;
                            break;

                        case 3:
                            quantity = computer.Resource.Coffe;
                            break;

                        case 4:
                            quantity = computer.Resource.Stress;
                            break;
                    }

                    var color = this.colorProgress(quantity, capacity);

                    if (systemResource.buildId == 4 && quantity < 0) {
                        color = "danger";
                    }
                    else if (systemResource.buildId == 4 && quantity < 0) {
                        color = "success";
                    }

                    return <Resource key={systemResource.id}
                        id={`recurso${systemResource.id}`}
                        image="iconResource1.png"
                        quantity={quantity}
                        color={color}
                        value={(Math.abs(quantity) * 100) / capacity}
                        popoverHeader={systemResource.name}
                        popoverBody={systemResource.description}
                    />
                })}

                <Col className="text-center" xs="4">
                    <Link to={{ pathname: `/game/${this.props.instituteId}` }}><img className="img-fluid" style={{ maxWidth: 'autor', maxHeight: '50px' }} src={require('../../images/internet.png')} /></Link>
                </Col>

                <Col xs="2">
                    <p>{computer.Name}</p>
                </Col>
                <Col xs="1">
                    <p>{computer.IpDirection}</p>
                </Col>
                    <Col xs="1 text-right">
                    <p>{computer.MemmoryUsed + '/' + computer.Memmory}</p>
                </Col>

                </Row>
            </Container>
        );


    }

    render() {

        let contents = this.renderResources(this.state.systems, this.props.computer);
        
        return (
            <div>
                {contents}
            </div>

        );
    }

}