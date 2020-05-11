import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from '../api-authorization/AuthorizeService';
import '../../css/NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            collapsed: true,
            isAuthenticated: false,
        };
    }

    logout() {
        authService.signOut();
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    async userAuthenticated() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
        this.setState({
            isAuthenticated,
            'user': user
        });
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.userAuthenticated());
        this.userAuthenticated();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }


    render() {

        let navUser = this.state.isAuthenticated
            ? (<>
                <NavItem>
                    <Link className="text-dark nav-link" to="">{this.state.user.name}</Link>
                </NavItem >
                <NavItem>
                    <NavLink onClick={this.logout} className="text-dark nav-link" to="">Logout</NavLink>
                </NavItem>
            </>
            )
            : (
                <>
                    <NavItem>
                        <Link className="text-dark nav-link" to="/registro">Registro</Link>
                    </NavItem >
                    <NavItem>
                        <Link className="text-dark nav-link" to="/login">Login</Link>
                    </NavItem>
                </>
            );

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow" light>
                    <Container className="" fluid={true}>
                        <NavbarBrand tag={Link} to="/">MarianaoWars</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/instituts">Institutos</NavLink>
                                </NavItem>
                                {navUser}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
