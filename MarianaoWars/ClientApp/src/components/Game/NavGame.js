import React, { Component } from 'react';
import { Resource } from './Resource';
import { Row, Col, Container } from 'reactstrap';
import { Link } from 'react-router-dom';


export class NavGame extends Component {

    static displayName = NavGame.name;

    constructor(props) {
        super(props);

        this.state = {
            systemResources: this.props.systemResources,
            userId: this.props.userId,
            instituteId: this.props.instituteId,
            computer: this.props.computer
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
    }

    componentDidMount() {
        
    }

    colorProgress(value, maxValue) {

        var fraccion = maxValue / 3;
        var color = "";

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

    renderResources(systemResources, computer) {

        var comupterStyle = {
            height: '100px',
            width: '100px',
            margin: 'auto',
            border: '1px solid black',
            borderRadius: '50%'
        }

        return (
            <Container>
            <Row style={{ alignItems: 'center' }}>
                {systemResources.map((systemResource, index) => {

                    var qty = 0;
                    var quantity = 0;
                    var maxQuantity = systemResource.lastVersion;
                    var maxQuantityLevel = 0;

                    switch (systemResource.buildId) {
                        case 2:
                            quantity = computer.Resource.Ingenyous;
                            maxQuantityLevel = computer.Resource.IngenyousLevel * maxQuantity;
                            break;

                        case 3:
                            quantity = computer.Resource.Coffe;
                            maxQuantityLevel = computer.Resource.CoffeLevel * maxQuantity;
                            break;

                        case 4:
                            quantity = computer.Resource.Stress;
                            maxQuantityLevel = computer.Resource.StressLevel * maxQuantity;
                            break;

                        case 1:
                            quantity = computer.Resource.Knowledge;
                            maxQuantityLevel = computer.Resource.KnowledgeLevel * maxQuantity;
                            break
                    }

                    var color = this.colorProgress(quantity, maxQuantityLevel);

                    return <Resource key={systemResource.id}
                        id={`recurso${systemResource.id}`}
                        image="iconResource1.png"
                        quantity={quantity}
                        color={color}
                        value={(quantity * 100) / maxQuantity}
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

        let contents = (this.state.systemResources != undefined)
            ? this.renderResources(this.state.systemResources, this.props.computer)
            : '';
        
        return (
            <div>
                {contents}
            </div>

        );
    }

}