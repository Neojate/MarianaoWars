import React, { Component } from 'react';
import { Route } from "react-router-dom";
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Layout } from './scenes/Layout';
import { GameLayout } from './scenes/GameLayout';
import { Home } from './components/main/Home';
import { Register } from './components/main/Register';
import { Login } from './components/main/Login';
import { InstitutePanel } from './components/main/InstitutePanel';
import './css/custom.css'



export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/registro' component={Register} />
                <Route path='/login' component={Login} />
                <AuthorizeRoute path='/instituts' component={InstitutePanel} />
                <Route path="/game/:instituteId" component={GameLayout} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}
