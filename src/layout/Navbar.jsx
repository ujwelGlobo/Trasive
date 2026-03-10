import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import "../layout/Navbar.css";
import AddQuery from "../features/query/CreateQuery/pages/AddQuery";

const Navbar = ({openAddQuery}) => {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpen(false);
  };

  return (
    <header className="navbar">

      {/* MOBILE MENU BUTTON */}
      <button
        className="mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu size={22} />
      </button>

      {/* NAV MENU */}
      <nav className={`navbar-menu ${mobileOpen ? "show" : ""}`}>

        <NavLink to="/dashboard" onClick={closeMobile}>
          Dashboard
        </NavLink>

        <NavLink to="/query" onClick={closeMobile}>
          Query
        </NavLink>

        <NavLink to="/itineraries" onClick={closeMobile}>
          Itineraries
        </NavLink>

        <NavLink to="/clients" onClick={closeMobile}>
          Clients
        </NavLink>

        <NavLink to="/suppliers" onClick={closeMobile}>
          Suppliers
        </NavLink>

        <NavLink to="/reports" onClick={closeMobile}>
          Reports
        </NavLink>

        <NavLink to="/master" onClick={closeMobile}>
          Master
        </NavLink>

        {/* MARKETING DROPDOWN */}
        <div className={`dropdown ${open ? "open" : ""}`} ref={dropdownRef}>
          <button
            className="dropdown-toggle"
            onClick={() => setOpen(!open)}
          >
            Marketing
          </button>

          <div className="dropdown-menu">

            <Link to="/marketing/dashboard" onClick={closeMobile}>
              Marketing Dashboard
            </Link>

            <Link to="/marketing/clients-group" onClick={closeMobile}>
              Clients Group
            </Link>

            <Link to="/marketing/email-templates" onClick={closeMobile}>
              Email Templates
            </Link>

            <Link to="/marketing/campaigns" onClick={closeMobile}>
              Campaigns
            </Link>

            <Link to="/marketing/landing-pages" onClick={closeMobile}>
              Landing Pages
            </Link>

          </div>
        </div>
      </nav>
      

      <button className="add-query-btn" onClick={openAddQuery}>
             Add Query
          </button>

    </header>
  );
};

export default Navbar;