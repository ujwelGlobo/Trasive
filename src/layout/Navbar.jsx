import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import "../layout/Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar">
      <nav className="navbar-menu">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/query">Query</NavLink>
        <NavLink to="/itineraries">Itineraries</NavLink>
        <NavLink to="/clients">Clients</NavLink>
        <NavLink to="/suppliers">Suppliers</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/master">Master</NavLink>

        {/* DROPDOWN */}
        <div className={`dropdown ${open ? "open" : ""}`} ref={dropdownRef}>
          <button className="dropdown-toggle" onClick={() => setOpen(!open)}>
            Marketing
            <ChevronDown
              size={16}
              className={`dropdown-icon ${open ? "rotate" : ""}`}
            />
          </button>

          <div className="dropdown-menu">
            <Link to="/marketing/dashboard" onClick={() => setOpen(false)}>
              Marketing Dashboard
            </Link>
            <Link to="/marketing/clients-group" onClick={() => setOpen(false)}>
              Clients Group
            </Link>
            <Link
              to="/marketing/email-templates"
              onClick={() => setOpen(false)}
            >
              Email Templates
            </Link>
            <Link to="/marketing/campaigns" onClick={() => setOpen(false)}>
              Campaigns
            </Link>
            <Link to="/marketing/landing-pages" onClick={() => setOpen(false)}>
              Landing Pages
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
