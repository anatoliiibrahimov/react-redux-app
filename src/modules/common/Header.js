import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav>
    <NavLink to="/" activeClassName="active">Home</NavLink>
    {' | '}
    <NavLink to="/courses" activeClassName="active">Courses</NavLink>
    {' | '}
    <NavLink to="/about" activeClassName="active">About</NavLink>
    {' | '}
    <NavLink to="/charts" activeClassName="active">Charts</NavLink>
  </nav>
);

export default Header;
