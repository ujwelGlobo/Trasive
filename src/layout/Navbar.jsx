import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import "../layout/Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
      
      {/* LEFT TOGGLE BUTTON (Mobile) */}
      <button
        className="mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu size={22} />
      </button>

      <nav className={`navbar-menu ${mobileOpen ? "show" : ""}`}>
        <NavLink to="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</NavLink>
        <NavLink to="/query" onClick={() => setMobileOpen(false)}>Query</NavLink>
        <NavLink to="/itineraries" onClick={() => setMobileOpen(false)}>Itineraries</NavLink>
        <NavLink to="/clients" onClick={() => setMobileOpen(false)}>Clients</NavLink>
        <NavLink to="/suppliers" onClick={() => setMobileOpen(false)}>Suppliers</NavLink>
        <NavLink to="/reports" onClick={() => setMobileOpen(false)}>Reports</NavLink>
        <NavLink to="/master" onClick={() => setMobileOpen(false)}>Master</NavLink>

        {/* DROPDOWN */}
        <div className={`dropdown ${open ? "open" : ""}`} ref={dropdownRef}>
          <button
            type="button"
            className="dropdown-toggle"
            onClick={() => setOpen((prev) => !prev)}
          >
            Marketing
          </button>

          <div className="dropdown-menu">
            <Link
              to="/marketing/dashboard"
              onClick={() => setMobileOpen(false)}
            >
              Marketing Dashboard
            </Link>
            <Link
              to="/marketing/clients-group"
              onClick={() => setMobileOpen(false)}
            >
              Clients Group
            </Link>
            <Link
              to="/marketing/email-templates"
              onClick={() => setMobileOpen(false)}
            >
              Email Templates
            </Link>
            <Link
              to="/marketing/campaigns"
              onClick={() => setMobileOpen(false)}
            >
              Campaigns
            </Link>
            <Link
              to="/marketing/landing-pages"
              onClick={() => setMobileOpen(false)}
            >
              Landing Pages
            </Link>
          </div>
        </div>
      </nav>
      {/* RIGHT SIDE BUTTON */}
<Link to="/query/add" className="add-query-btn">
  Add Query
</Link>
    </header>
  );
};

export default Navbar;