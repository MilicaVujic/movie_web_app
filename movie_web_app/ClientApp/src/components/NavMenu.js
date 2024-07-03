import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
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
      theme: 'light' // Početna tema je svijetla
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

    // Ovdje možete postaviti globalni state ili koristiti Redux za promjenu teme u cijeloj aplikaciji
    // Primjer kako bi moglo izgledati postavljanje teme u globalnom Redux state-u:
    // this.props.setTheme(newTheme);
  }

  render() {
    const { theme } = this.state;

    return (
      <header>
        <Navbar className={`navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} light>
          <NavbarBrand tag={Link} to="/">movie_web_app</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
            </ul>
          </Collapse>
          <button className="btn btn-sm btn-outline-secondary ml-auto" onClick={this.toggleTheme}>
            Toggle Theme
          </button>
        </Navbar>
      </header>
    );
  }
}
