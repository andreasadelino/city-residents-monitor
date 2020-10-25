import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { NavbarBrand, NavItem, NavLink } from 'reactstrap';

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <span className="brand-title">City Residences Track</span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>Home</span>
    </NavLink>
  </NavItem>
);
