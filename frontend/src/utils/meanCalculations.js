// Calculate arithmetic mean
export const calculateArithmeticMean = (values) => {
  if (!values || values.length === 0) return null;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

// Calculate geometric mean
export const calculateGeometricMean = (values) => {
  if (!values || values.length === 0) return null;
  const product = values.reduce((acc, val) => acc * (1 + val), 1);
  return Math.pow(product, 1 / values.length) - 1;
};

// Calculate harmonic mean
export const calculateHarmonicMean = (values) => {
  if (!values || values.length === 0) return null;
  const sumOfReciprocals = values.reduce((acc, val) => acc + 1 / val, 0);
  return values.length / sumOfReciprocals;
};

// Calculate weighted mean
export const calculateWeightedMean = (values, weights) => {
  if (
    !values ||
    !weights ||
    values.length === 0 ||
    values.length !== weights.length
  )
    return null;
  const weightedSum = values.reduce((acc, val, i) => acc + val * weights[i], 0);
  const weightSum = weights.reduce((acc, val) => acc + val, 0);
  return weightedSum / weightSum;
};

// Main calculation function
export const calculateMeans = (inputData) => {
  const results = {};
  const values = inputData.values || [];

  if (values.length > 0) {
    results.arithmeticMean = calculateArithmeticMean(values);
    results.geometricMean = calculateGeometricMean(values);
    results.harmonicMean = calculateHarmonicMean(values);

    if (inputData.weights && inputData.weights.length === values.length) {
      results.weightedMean = calculateWeightedMean(values, inputData.weights);
    } else {
      results.weightedMean = null;
    }
  }

  return results;
};
