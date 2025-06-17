import React, { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import "../../App.css";

const MeanCalculator = () => {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState(null);

  const calculateMean = () => {
    const numberArray = numbers
      .split(",")
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num));

    if (numberArray.length === 0) {
      setResult("Please enter valid numbers");
      return;
    }

    const sum = numberArray.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / numberArray.length;
    setResult(mean.toFixed(2));
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
                type="text"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder="Enter numbers (comma-separated)"
                className="form-control"
              />
              <button onClick={calculateMean} className="btn btn-primary">
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
                <h4>Mean:</h4>
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
          <p>
            The mean (average) is calculated by adding up all the numbers and
            dividing by the count of numbers.
          </p>
          <p>Enter your numbers separated by commas (e.g., 1, 2, 3, 4, 5)</p>
        </div>
      </div>
    </>
  );
};

export default MeanCalculator;
