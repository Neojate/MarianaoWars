import React, { Component } from 'react';
import '../css/MenuSystem.css';

export class MenuSystem extends Component {
    static displayName = MenuSystem.name;

    constructor(props) {
        super.props;
        this.state = { data: [], loading: true };
    }

    render() {
        return (
            <div className="MenuSystem">

                {/* Logotipo */}
                <div>
                    <img src="" />
                </div>

                {/* Titulo */}
                <div>
                    <div className="SubTitle">Nombre:</div>
                    <div className="Title">Nombre de prueba</div>
                </div>
                <hr />

                {/* Datos */}
                <div>
                    <div>IP:</div>
                    <div>255.255.255.255</div>
                </div>
                <div>
                    <div>Memoria RAM:</div>
                    <div>12 Gb</div>
                </div>
                <hr />

                {/* Alertas */}
                <div>
                </div>

            </div>
        );
    }
}