import React, { useState } from "react";
import { FaChartLine } from "react-icons/fa";
import "../../App.css";

const ReturnCalculator = () => {
  const [initialValue, setInitialValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [result, setResult] = useState(null);

  const calculateReturn = () => {
    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);

    if (isNaN(initial) || isNaN(final)) {
      setResult("Please enter valid numbers");
      return;
    }

    if (initial === 0) {
      setResult("Initial value cannot be zero");
      return;
    }

    const returnValue = ((final - initial) / initial) * 100;
    setResult(returnValue.toFixed(2) + "%");
  };

  return (
    <>
      {/* Left Column */}
      <div className="calculator-left-column">
        {/* Top Row */}
        <div className="calculator-top-row">
          <div className="card-header">
            <h3>Input</h3>
          </div>
          <div className="card-content">
            <div className="input-group">
              <input
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value)}
                placeholder="Initial Value"
                className="form-control"
              />
              <input
                type="number"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                placeholder="Final Value"
                className="form-control"
              />
              <button onClick={calculateReturn} className="btn btn-primary">
                Calculate
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Row */}
        <div className="calculator-bottom-row">
          <div className="card-header">
            <h3>Results</h3>
          </div>
          <div className="card-content">
            {result !== null && (
              <div className="result">
                <h4>Return:</h4>
                <p>{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="calculator-right-column">
        <div className="card-header">
          <h3>Information</h3>
        </div>
        <div className="card-content">
          <p>The return on investment (ROI) is calculated using the formula:</p>
          <p>ROI = ((Final Value - Initial Value) / Initial Value) × 100%</p>
          <p>
            Enter your initial investment value and final value to calculate the
            percentage return.
          </p>
        </div>
      </div>
    </>
  );
};

export default ReturnCalculator;
