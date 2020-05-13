import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { BuildIdName, NeedNames } from '../services/SystemConstants'

import knowledgeicon from '../../images/icon/knowledgeicon.png';
import ingenyousicon from '../../images/icon/ingenyous-icon.png';
import coffeeicon from '../../images/icon/coffeeicon.png';
import sleepicon from '../../images/icon/sleep-icon.png';

import gediticon from '../../images/icon/gediticon.png';
import mysqlicon from '../../images/icon/mysqlicon.png';
import githubicon from '../../images/icon/githubicon.png';
import stackoverflowicon from '../../images/icon/stackoverflowicon.png';
import postmanicon from '../../images/icon/postmanicon.png';
import virtualboxicon from '../../images/icon/virtualboxicon.png';


export class SystemPanel extends Component {

    static displayName = SystemPanel.name;

    constructor(props) {
        super(props);

        this.state = {

            System: this.props.location.state.system,
            typeSystem: this.props.location.state.typeSystem,
            instituteId: this.props.match.params.instituteId,
            computerActive: [],
            buildOrders: [],
            loading: true,
            hover: false,
            active: false,
            canBeUpdate: true,

        };

        this.createOrderBuild = this.createOrderBuild.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.computerActive !== prevProps.computerActive) {
            this.setState({
                computerActive: this.props.computerActive
            })
        }

        if (this.props.buildOrders !== prevProps.buildOrders) {
            this.setState({
                buildOrders: this.props.buildOrders
            })
        }

        if (this.props.location.state.system.name !== prevProps.location.state.system.name) {
            this.setState({
                System: this.props.location.state.system
            });
        }

        if (this.props.location.state.typeSystem !== prevProps.location.state.typeSystem) {
            this.setState({
                typeSystem: this.props.location.state.typeSystem
            });
        }
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

    buildIsUpdating() {

        let typeBuildsUpdating = [];
        for (const build of this.state.buildOrders) {
            //introdude las decenas de los systemas, para controlar los que ya estan actualizando
            typeBuildsUpdating.push(String(build.BuildId).padStart(2, "0").substring(0, 1));
        }

        return typeBuildsUpdating;

    }


    systemLevel() {

        if (this.state.typeSystem === 0) {
            return this.state.computerActive.Resource[`${BuildIdName[this.state.System.buildId]}Level`];
        }
        else if (this.state.typeSystem === 2) {
            return this.state.computerActive.Software[`${BuildIdName[this.state.System.buildId]}Version`];
        }
        else if (this.state.typeSystem === 4) {
            return this.state.computerActive.Talent[`${BuildIdName[this.state.System.buildId]}Level`];
        }

    }

    neededToUpdate() {

        let canBeUpdate = true;
        let version = this.systemLevel();

        let requeriments = {
            needKnowledge: 0,
            needIngenyous: 0,
            needCoffee: 0,
            needSleep: 0,
            needBuild: 0
        }

        for (const need in requeriments) {

            //si el requerimiento es una propiedad del system
            if (need in this.state.System) {
                requeriments[need] = this.state.System[need].split(",")[version];

                //comparamos la cantidad que tenemos con la necesidad del recurso
                let recurso = need.split("need")[1];
                if (need !== "needBuild" && requeriments[need] > this.state.computerActive.Resource[recurso]) {
                    canBeUpdate = false;
                }
                else if (need === "needBuild" && requeriments[need] > this.state.computerActive.Software.StackOverFlowVersion) {
                    canBeUpdate = false;
                }

            }
        }

        if (this.buildIsUpdating().includes(this.state.typeSystem.toString())){
            canBeUpdate = false;
        }
        
        return {
            'needs': requeriments,
            'canBeUpdate': canBeUpdate
        }
    }

    render() {

        if (this.state.computerActive.length === 0) {
            return "";
        }

        let requeriments = this.neededToUpdate();

        let containsRequeriment =
            (<div className="row">
                <div className="col-6">
                    Requisitos:
                        </div>
                <div className="col-6">
                    {Object.keys(requeriments.needs).map(function (key) {
                        if (requeriments.needs[key] > 0) {
                            return <div key={key}>{`${NeedNames[key]}: ${requeriments.needs[key]}`}</div>
                        }
                    })}
                </div>
            </div>);

        let updateButton = requeriments.canBeUpdate ? <Button color="primary" onClick={this.createOrderBuild}>Actualizar</Button> : <Button color="primary" disabled>Actualizar</Button>;
        
        return (
            <div className="box" >
                <h2>{this.state.System.name}</h2>
                <hr />
                <div className="icon-description">
                    {this.selectIcon(this.state.System.buildId)}
                    <p>{this.state.System.description}</p>
                </div>
                <hr />
                <div>
                    <p>{`Nivel ${this.systemLevel()} de ${this.state.System.lastVersion}`}</p>
                </div>
                <div className="container">
                    {containsRequeriment}
                </div>
                <div>
                    {updateButton}
                </div>
            </div>
        );
    }

    createOrderBuild() {
        fetch(`game/createbuildorder?instituteId=${this.state.instituteId}&computerId=${this.state.computerActive.Id}&buildId=${this.state.System.buildId}`)
            .then((response) => {});
    }

    selectIcon(id) {
        switch (id) {
            case 1: return <img alt="img" src={knowledgeicon} />
            case 2: return <img alt="img" src={ingenyousicon} />
            case 3: return <img alt="img" src={coffeeicon} />
            case 4: return <img alt="img" src={sleepicon} />

            case 21: return <img alt="img" src={gediticon} />
            case 22: return <img alt="img" src={mysqlicon} />
            case 23: return <img alt="img" src={githubicon} />
            case 24: return <img alt="img" src={stackoverflowicon} />
            case 25: return <img alt="img" src={postmanicon} />
            case 26: return <img alt="img" src={virtualboxicon} />
            default:
                return <img alt="img" src={knowledgeicon} />
                break;
        }
    }

}