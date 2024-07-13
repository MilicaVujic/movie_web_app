import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Button, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);

    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggleTheme() {
    const { toggleTheme } = this.props;
    if (toggleTheme) {
      toggleTheme();
    }
  }

  render() {
    const { collapsed } = this.state;
    const { currentTheme } = this.props;

    // Determine the class for NavLink based on currentTheme
    const navLinkClass = currentTheme === 'dark' ? 'nav-link nav-link-dark' : 'nav-link';

    return (
      <header>
        <Navbar className={`navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 ${currentTheme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} light>
          <NavbarBrand tag={Link} to="/">Movie App</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink exact tag={Link} className={navLinkClass} to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact tag={Link} className={navLinkClass} to="/registration">Registration</NavLink>
              </NavItem>
            </ul>
          </Collapse>
          <div className="ml-auto">
            <span className={`theme-text ${currentTheme === 'dark' ? 'text-white' : 'text-dark'}`}>Change Theme</span>
            <Button color="secondary" className={`toggle-theme-button ${currentTheme}`} onClick={this.toggleTheme}>
              <div className={`toggle-theme-icon ${currentTheme === 'dark' ? 'toggle-theme-icon-dark' : 'toggle-theme-icon-light'}`}></div>
            </Button>
          </div>
        </Navbar>
      </header>
    );
  }
}

export default NavMenu;
