import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
     
      {/* CENTER: NAV LINKS */}
      <nav className="navbar-menu">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/query">Query</NavLink>
        <NavLink to="/itineraries">Itineraries</NavLink>
        <NavLink to="/clients">Clients</NavLink>
        <NavLink to="/suppliers">Suppliers</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/master">Master</NavLink>
        <NavLink to="/marketing">Marketing</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
