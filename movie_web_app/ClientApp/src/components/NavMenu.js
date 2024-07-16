import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Button, NavItem, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = ({ currentTheme, toggleTheme }) => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const signOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const navLinkClass = currentTheme === 'dark' ? 'nav-link nav-link-dark' : 'nav-link';

  return (
    <header>
      <Navbar className={`navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 ${currentTheme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} light>
        <NavbarBrand tag={Link} to="/">Movie App</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink exact tag={Link} className={navLinkClass} to="/home">Home</NavLink>
            </NavItem>
          </ul>
        </Collapse>
        <div className="ml-auto">
        <span
          className={`theme-text ${currentTheme === 'dark' ? 'text-white' : 'text-dark'}`}
          onClick={signOut} 
          style={{ cursor: 'pointer' }} 
        >
          Sign out
        </span>
      </div>
      <div className="ml-auto">
          <span className={`theme-text ${currentTheme === 'dark' ? 'text-white' : 'text-dark'}`}>Change Theme</span>
          <Button color="secondary" className={`toggle-theme-button ${currentTheme}`} onClick={toggleTheme}>
            <div className={`toggle-theme-icon ${currentTheme === 'dark' ? 'toggle-theme-icon-dark' : 'toggle-theme-icon-light'}`}></div>
          </Button>
        </div>
      </Navbar>
    </header>
  );
};

export default NavMenu;
