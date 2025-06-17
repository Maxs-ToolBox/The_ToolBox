import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/components.css";
import "./styles/layouts.css";
import "./styles/utilities.css";
import HomeLayout from "./layouts/HomeLayout";
import CalculatorLayout from "./layouts/CalculatorLayout";
import WorkToolsLayout from "./layouts/WorkToolsLayout";
import MeanCalculator from "./components/calculators/MeanCalculator";
import ReturnCalculator from "./components/calculators/ReturnCalculator";
import CompanyLocator from "./components/worktools/CompanyLocator";

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">The ToolBox</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/calculators" className="nav-link">
              Calculators
            </Link>
            <Link to="/work-tools" className="nav-link">
              Work Tools
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/calculators" element={<CalculatorLayout />} />
          <Route
            path="/calculators/mean"
            element={
              <CalculatorLayout>
                <MeanCalculator />
              </CalculatorLayout>
            }
          />
          <Route
            path="/calculators/return"
            element={
              <CalculatorLayout>
                <ReturnCalculator />
              </CalculatorLayout>
            }
          />
          <Route path="/work-tools" element={<WorkToolsLayout />} />
          <Route
            path="/worktools/company-locator"
            element={<CompanyLocator />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
