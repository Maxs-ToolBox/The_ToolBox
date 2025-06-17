// Calculate holding period return
export const calculateHoldingPeriodReturn = (initialValue, finalValue) => {
  if (!initialValue || !finalValue) return null;
  return (finalValue - initialValue) / initialValue;
};

// Calculate time-weighted return
export const calculateTimeWeightedReturn = (timeSeriesData) => {
  if (!timeSeriesData || timeSeriesData.length < 2) return null;

  let twr = 1;
  for (let i = 1; i < timeSeriesData.length; i++) {
    const prevValue = timeSeriesData[i - 1].portfolioValue;
    const currValue = timeSeriesData[i].portfolioValue;
    const cashFlow = timeSeriesData[i].cashFlow || 0;

    if (!prevValue || !currValue) continue;

    const hpr = (currValue - cashFlow - prevValue) / prevValue;
    twr *= 1 + hpr;
  }

  return twr - 1;
};

// Calculate money-weighted return (IRR)
export const calculateMoneyWeightedReturn = (timeSeriesData) => {
  if (!timeSeriesData || timeSeriesData.length < 2) return null;

  // Sort data by date
  const sortedData = [...timeSeriesData].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Create cash flow array for IRR calculation
  const cashFlows = sortedData.map((data, index) => {
    if (index === 0) return -data.portfolioValue;
    if (index === sortedData.length - 1) return data.portfolioValue;
    return data.cashFlow || 0;
  });

  // Simple IRR calculation using binary search
  const calculateIRR = (cashFlows, guess = 0.1) => {
    const maxIterations = 100;
    const tolerance = 0.0001;
    let x0 = guess;
    let x1;

    for (let i = 0; i < maxIterations; i++) {
      let fx = 0;
      let fpx = 0;

      for (let j = 0; j < cashFlows.length; j++) {
        fx += cashFlows[j] / Math.pow(1 + x0, j);
        if (j > 0) {
          fpx += (-j * cashFlows[j]) / Math.pow(1 + x0, j + 1);
        }
      }

      x1 = x0 - fx / fpx;

      if (Math.abs(x1 - x0) < tolerance) {
        return x1;
      }

      x0 = x1;
    }

    return x0;
  };

  return calculateIRR(cashFlows);
};

// Calculate annualized return
export const calculateAnnualizedReturn = (holdingPeriodReturn, period) => {
  if (!holdingPeriodReturn || !period) return null;
  return Math.pow(1 + holdingPeriodReturn, 1 / period) - 1;
};

// Calculate continuously compounded return
export const calculateContinuousReturn = (holdingPeriodReturn) => {
  if (!holdingPeriodReturn) return null;
  return Math.log(1 + holdingPeriodReturn);
};

// Calculate leveraged return
export const calculateLeveragedReturn = (holdingPeriodReturn, leverage) => {
  if (!holdingPeriodReturn || !leverage) return null;
  return holdingPeriodReturn * leverage;
};

// Calculate multi-period holding period return
export const calculateMultiPeriodHPR = (timeSeriesData) => {
  if (!timeSeriesData || timeSeriesData.length < 2) return null;

  const firstValue = timeSeriesData[0].portfolioValue;
  const lastValue = timeSeriesData[timeSeriesData.length - 1].portfolioValue;

  return calculateHoldingPeriodReturn(firstValue, lastValue);
};

// Calculate multi-period annualized return
export const calculateMultiPeriodAnnualizedReturn = (timeSeriesData) => {
  if (!timeSeriesData || timeSeriesData.length < 2) return null;

  const firstDate = new Date(timeSeriesData[0].date);
  const lastDate = new Date(timeSeriesData[timeSeriesData.length - 1].date);
  const years = (lastDate - firstDate) / (1000 * 60 * 60 * 24 * 365);

  const hpr = calculateMultiPeriodHPR(timeSeriesData);
  return calculateAnnualizedReturn(hpr, years);
};

// Main calculation function
export const calculateReturns = (inputData, mode) => {
  const results = {};

  if (mode === "single") {
    // Single period calculations
    if (
      inputData.singlePeriodData.initialValue &&
      inputData.singlePeriodData.finalValue
    ) {
      results.holdingPeriodReturn = calculateHoldingPeriodReturn(
        inputData.singlePeriodData.initialValue,
        inputData.singlePeriodData.finalValue
      );

      if (inputData.singlePeriodData.period) {
        results.annualizedReturn = calculateAnnualizedReturn(
          results.holdingPeriodReturn,
          inputData.singlePeriodData.period
        );
      }
    }
  } else {
    // Multi-period calculations
    if (inputData.timeSeriesData.length > 0) {
      results.holdingPeriodReturn = calculateMultiPeriodHPR(
        inputData.timeSeriesData
      );
      results.annualizedReturn = calculateMultiPeriodAnnualizedReturn(
        inputData.timeSeriesData
      );
      results.timeWeightedReturn = calculateTimeWeightedReturn(
        inputData.timeSeriesData
      );
      results.moneyWeightedReturn = calculateMoneyWeightedReturn(
        inputData.timeSeriesData
      );
    }
  }

  // Calculate additional metrics if applicable
  if (results.holdingPeriodReturn) {
    if (mode === "single" && inputData.singlePeriodData.continuousCompounding) {
      results.continuouslyCompoundedReturn = calculateContinuousReturn(
        results.holdingPeriodReturn
      );
    }

    if (mode === "single" && inputData.singlePeriodData.leverage) {
      results.leveragedReturn = calculateLeveragedReturn(
        results.holdingPeriodReturn,
        inputData.singlePeriodData.leverage
      );
    }
    // Add logic for multi-period if leverage/continuous compounding are added to timeSeriesData
  }

  return results;
};
