import React, { Component } from 'react';
import '../../css/marianao_style.css';
import { Card } from './Card';
import { Link } from 'react-router-dom';


export class Home extends Component {
    static displayName = Home.name;

    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    render () {
        return (
            <div className="content">
                <div className="row">
                    <Card title="Apertura del Instituto Marianao" body="Vuelve el mas mitico de los miticos institutos. A partir del 1 de mayo el Instituto Marianao reabre sus puertas. Modo clasico, ratios 1x, old school fashion week. Entra, programa, compite, llora, que es un bucle? Vamos! Todavia no has entrado? Se el mejor de todos y gana cuantiosos premios en forma de cafes y donuts! Ahora disponible con menos errores 404." image="laptop01.jpg" />
                    <Card title="Prepara tu soborno!" body="Rapido abre tu cartera, compra potenciadores, danos tu dinero. Ya estan aqui los nuevos maestros multietnicos. Y gracias a ellos no habra asignatura que se te resista. Contrata a Marga para no ver mermada tu capacidad de almacenamiento o a Miguel Angel si necesitas mas scripts de batalla. Ganate el favor del claustro a mandobles con la visa y se el rey del Instituto." image="teachers.jpg" />
                    <Link className="btn btn-success" to="/instituts/openinstitutes">Comienza a jugar YA</Link>
                </div>
            </div>
        );
    }
}
