import React, { Component } from 'react';

export class NavGame extends Component {

    render() {
        return (
            <div>
                <nav class="collapse navbar-collapse">
                    <div id="nav_knowledge">
                        Conocimiento
                    </div>
                    <div id="nav_ingenuity">
                        Ingenio
                    </div>
                    <div id="nav_coffee">
                        Café
                    </div>
                    <div id="nav_sleep">
                        Estrés
                    </div>
                </nav>
            </div>
        );
    }

}