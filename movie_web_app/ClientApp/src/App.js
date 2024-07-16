import React, { Component } from 'react';
import NavMenu from './components/NavMenu';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    const { toggleTheme, currentTheme } = this.props;

    return (
        <div>
          <NavMenu toggleTheme={toggleTheme} currentTheme={currentTheme} />
          <AppRoutes />
        </div>
    );
  }
}
