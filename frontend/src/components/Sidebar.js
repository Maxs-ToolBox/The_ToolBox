import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../App.css";

const Sidebar = ({ items }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <ul className="calculator-list">
        {items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`sidebar-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.icon}
              <span className="link-text">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
    </nav>
  );
};

export default Sidebar;
