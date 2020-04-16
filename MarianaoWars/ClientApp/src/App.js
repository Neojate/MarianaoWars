import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Register } from './components/Register';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Chat } from './components/Chat';
import './custom.css'
import { Prueba } from './components/prueba';
import { InstitutePanel } from './components/InstitutePanel';
import { Game } from './components/game/Game';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/registro' component={Register} />
                        <Route path='/chat' component={Chat} />
                        <AuthorizeRoute path='/fetch-data' component={FetchData} />
                        <Route path='/cacados' component={Prueba} />
                        <Route path='/instituts' component={InstitutePanel} />
                        <Route path="/game/:instituteId" component={Game} />
                        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                    </Switch>
                </Router>
            </Layout>
        );
    }
}
