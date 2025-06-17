import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaCalculator, FaChartLine } from "react-icons/fa";
import "../App.css";

const CalculatorTemplate = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/calculators";

  const calculatorItems = [
    {
      path: "/calculators/mean",
      label: "Mean Calculator",
      icon: <FaCalculator className="sidebar-icon" />,
    },
    {
      path: "/calculators/return",
      label: "Return Calculator",
      icon: <FaChartLine className="sidebar-icon" />,
    },
  ];

  return (
    <>
      <Sidebar items={calculatorItems} />
      <div className="page-container">
        <div className="calculator-main">
          {isHome ? (
            <>
              {/* Left Column */}
              <div className="calculator-left-column">
                {/* Top Row */}
                <div className="calculator-top-row">
                  <div className="card-header">
                    <h3>Welcome to Calculators</h3>
                  </div>
                  <div className="card-content">
                    <p>Select a calculator from the sidebar to get started.</p>
                  </div>
                </div>
                {/* Bottom Row */}
                <div className="calculator-bottom-row">
                  <div className="card-header">
                    <h3>Available Calculators</h3>
                  </div>
                  <div className="card-content">
                    <ul>
                      <li>
                        Mean Calculator - Calculate the average of a set of
                        numbers
                      </li>
                      <li>
                        Return Calculator - Calculate the return on investment
                        (ROI)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="calculator-right-column">
                <div className="card-header">
                  <h3>Information</h3>
                </div>
                <div className="card-content">
                  <p>
                    Choose a calculator from the sidebar to see its specific
                    information and usage instructions.
                  </p>
                </div>
              </div>
            </>
          ) : (
            children
          )}
        </div>
      </div>
    </>
  );
};

export default CalculatorTemplate;
