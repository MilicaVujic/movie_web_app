// App.js
import React, { Component } from 'react';
import NavMenu from './components/NavMenu';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    const { toggleTheme, currentTheme } = this.props;

    return (
      <div>
        <NavMenu toggleTheme={toggleTheme} currentTheme={currentTheme} />
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
        </div>
    );
  }
}
