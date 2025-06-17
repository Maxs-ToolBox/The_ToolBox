import React from "react";
import { Link } from "react-router-dom";

const HomeTemplate = () => {
  return (
    <div className="home-page">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-normal mb-3">Welcome to Max's Toolbox</h1>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-md-10">
            <p className="text-center mb-4">
              Welcome to my personal collection of tools and calculators! This
              website is designed to provide easy access to various utilities
              that I've found useful in my work. Whether you need to perform
              complex calculations or use specialized work tools, you'll find
              everything organized and ready to use.
            </p>
            <p className="text-center">
              Feel free to explore the different sections and let me know if you
              have any suggestions for new tools or improvements to existing
              ones.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-calculator text-primary me-3"></i>
                  <h3 className="card-title mb-0">CFA Calculators</h3>
                </div>
                <p className="card-text">
                  I recently completed the CFA Level 1 exam and found that I
                  needed a way to calculate the various formulas and concepts
                  that I was learning.
                </p>
                <div className="mt-auto">
                  <Link to="/calculators" className="btn btn-primary">
                    View Calculators
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-tools text-primary me-3"></i>
                  <h3 className="card-title mb-0">Work Tools</h3>
                </div>
                <p className="card-text">
                  I have made a few tools that I use in my daily work. I'm
                  always looking for ways to improve my workflow and these tools
                  are a way for me to do that.
                </p>
                <div className="mt-auto">
                  <Link to="/work-tools" className="btn btn-primary">
                    View Work Tools
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
