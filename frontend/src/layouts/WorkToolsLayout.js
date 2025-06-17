import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaBuilding } from "react-icons/fa";
import "../App.css";

const WorkToolsTemplate = () => {
  const location = useLocation();
  const isHome = location.pathname === "/work-tools";

  const workToolItems = [
    {
      path: "/worktools/company-locator",
      label: "Company Locator",
      icon: <FaBuilding className="sidebar-icon" />,
    },
  ];

  return (
    <>
      <Sidebar items={workToolItems} />
      <div className="page-container">
        {isHome ? (
          <div className="work-tools-main">
            <div className="work-tools-welcome">
              <h2>Welcome to Work Tools</h2>
              <p>Select a tool from the sidebar to get started.</p>
            </div>
          </div>
        ) : (
          <div className="work-tools-main">
            {/* Tool content will be rendered here */}
          </div>
        )}
      </div>
    </>
  );
};

export default WorkToolsTemplate;
