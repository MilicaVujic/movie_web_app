import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Container style={{ maxWidth: '100%', paddingRight: 0, paddingLeft: 0 }} tag="main">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
