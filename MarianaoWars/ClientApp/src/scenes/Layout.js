import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from '../components/main/NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <>
        <NavMenu />
            <Container className="themed-container" fluid={true} style={{ position: "relative" }}>
          {this.props.children}
        </Container>
      </>
    );
  }
}
