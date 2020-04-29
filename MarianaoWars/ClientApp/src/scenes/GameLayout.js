import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { Game } from '../components/game/Game';
import { Network } from '../components/game/Network';

export class GameLayout extends Component {
    static displayName = GameLayout.name;

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.location.state.userId,
            instituteId: this.props.match.params.instituteId
        };
    }


  render () {
    return (
        <>
            <Game userId={this.state.userId} instituteId={this.state.instituteId}>
                <Route path="/game/:instituteId" component={Network} />
            </Game>
      </>
    );
  }
}
