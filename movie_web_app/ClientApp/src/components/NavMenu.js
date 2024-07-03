import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);

    this.state = {
      collapsed: true,
      theme: 'light'
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggleTheme() {
    const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setState({ theme: newTheme });
  }

  render() {
    const { theme } = this.state;

    return (
      <header>
        <Navbar className={`navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} light>
          <NavbarBrand tag={Link} to="/">Movie App</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
          </Collapse>
          <div className="ml-auto">
            <span className={`theme-text ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>Change Theme</span>
            <Button color="secondary" className={`toggle-theme-button ${theme}`} onClick={this.toggleTheme}>
              <div className="toggle-theme-icon"></div>
            </Button>
          </div>
        </Navbar>
      </header>
    );
  }
}
