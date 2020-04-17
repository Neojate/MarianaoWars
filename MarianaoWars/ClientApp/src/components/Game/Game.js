import React, { Component } from 'react'
import { NavGame } from './NavGame';
import authService from '../api-authorization/AuthorizeService';

export class Game extends Component {

    constructor(props) {
        super(props);

        //let instituteId = useParams();

        this.state = {
            userId: false,
            instituteId: this.props.match.params.instituteId
        };
    }

    componentDidMount() {
        this.populateState();
    }


    render() {

        let content = !this.state.userId
            ? ''
            : <NavGame userId={this.state.userId} instituteId={this.state.instituteId} />;

        return (
            <div>
                {content}
            </div>
        );
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
        console.log("------user-----");
        console.log(user);
        console.log("------isautenticated-----");
        console.log(isAuthenticated);
        this.setState({
            isAuthenticated,
            'userId': user.sub
        });
    }

}
