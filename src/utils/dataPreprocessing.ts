
/**
 * Data Preprocessing Utilities
 * JavaScript/TypeScript implementations of common Python data science operations
 * Equivalent to pandas, numpy, and sklearn preprocessing functions
 */

// Train-Test Split (equivalent to sklearn.model_selection.train_test_split)
export const trainTestSplit = <T>(
  data: T[], 
  testSize: number = 0.2, 
  randomState?: number
): { trainData: T[], testData: T[] } => {
  if (randomState) {
    // Simple seeded random for reproducibility
    Math.random = () => {
      const x = Math.sin(randomState++) * 10000;
      return x - Math.floor(x);
    };
  }
  
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  const splitIndex = Math.floor(data.length * (1 - testSize));
  
  return {
    trainData: shuffled.slice(0, splitIndex),
    testData: shuffled.slice(splitIndex)
  };
};

// Missing Value Imputation (equivalent to sklearn.impute.SimpleImputer)
export const imputeMissingValues = (
  data: (number | null)[][], 
  strategy: 'mean' | 'median' | 'most_frequent' = 'mean'
): number[][] => {
  const numCols = data[0].length;
  const result: number[][] = [];
  
  // Calculate imputation values for each column
  const imputeValues: number[] = [];
  
  for (let col = 0; col < numCols; col++) {
    const columnValues = data.map(row => row[col]).filter(val => val !== null) as number[];
    
    switch (strategy) {
      case 'mean':
        imputeValues[col] = columnValues.reduce((a, b) => a + b, 0) / columnValues.length;
        break;
      case 'median':
        const sorted = columnValues.sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        imputeValues[col] = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
        break;
      case 'most_frequent':
        const frequency = new Map<number, number>();
        columnValues.forEach(val => frequency.set(val, (frequency.get(val) || 0) + 1));
        imputeValues[col] = Array.from(frequency.entries()).reduce((a, b) => a[1] > b[1] ? a : b)[0];
        break;
    }
  }
  
  // Apply imputation
  data.forEach(row => {
    const newRow: number[] = [];
    row.forEach((val, index) => {
      newRow.push(val === null ? imputeValues[index] : val);
    });
    result.push(newRow);
  });
  
  return result;
};

// Outlier Detection (equivalent to sklearn.ensemble.IsolationForest)
export const detectOutliers = (data: number[][], contamination: number = 0.1): boolean[] => {
  // Simple outlier detection using IQR method
  const outliers: boolean[] = new Array(data.length).fill(false);
  const numFeatures = data[0].length;
  
  for (let feature = 0; feature < numFeatures; feature++) {
    const values = data.map(row => row[feature]).sort((a, b) => a - b);
    const q1 = values[Math.floor(values.length * 0.25)];
    const q3 = values[Math.floor(values.length * 0.75)];
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    
    data.forEach((row, index) => {
      if (row[feature] < lowerBound || row[feature] > upperBound) {
        outliers[index] = true;
      }
    });
  }
  
  return outliers;
};

// Feature Selection (equivalent to sklearn.feature_selection.SelectKBest)
export const selectKBestFeatures = (
  features: number[][], 
  targets: number[], 
  k: number
): { selectedFeatures: number[][], featureIndices: number[] } => {
  // Simple correlation-based feature selection
  const numFeatures = features[0].length;
  const correlations: { index: number, correlation: number }[] = [];
  
  for (let i = 0; i < numFeatures; i++) {
    const featureValues = features.map(row => row[i]);
    const correlation = calculateCorrelation(featureValues, targets);
    correlations.push({ index: i, correlation: Math.abs(correlation) });
  }
  
  // Sort by correlation and select top k
  correlations.sort((a, b) => b.correlation - a.correlation);
  const selectedIndices = correlations.slice(0, k).map(item => item.index);
  
  const selectedFeatures = features.map(row => 
    selectedIndices.map(index => row[index])
  );
  
  return { selectedFeatures, featureIndices: selectedIndices };
};

// Helper function to calculate Pearson correlation
const calculateCorrelation = (x: number[], y: number[]): number => {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
  const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);
  const sumY2 = y.reduce((acc, yi) => acc + yi * yi, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return denominator === 0 ? 0 : numerator / denominator;
};

// Cross-Validation (equivalent to sklearn.model_selection.cross_val_score)
export const crossValidationSplit = <T>(
  data: T[], 
  folds: number = 5
): { train: T[], test: T[] }[] => {
  const foldSize = Math.floor(data.length / folds);
  const splits: { train: T[], test: T[] }[] = [];
  
  for (let i = 0; i < folds; i++) {
    const testStart = i * foldSize;
    const testEnd = i === folds - 1 ? data.length : (i + 1) * foldSize;
    
    const test = data.slice(testStart, testEnd);
    const train = [...data.slice(0, testStart), ...data.slice(testEnd)];
    
    splits.push({ train, test });
  }
  
  return splits;
};

// Performance Metrics (equivalent to sklearn.metrics)
export const calculateMetrics = (
  yTrue: number[], 
  yPred: number[]
): {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: number[][];
} => {
  const tp = yTrue.reduce((acc, actual, i) => acc + (actual === 1 && yPred[i] === 1 ? 1 : 0), 0);
  const fp = yTrue.reduce((acc, actual, i) => acc + (actual === 0 && yPred[i] === 1 ? 1 : 0), 0);
  const tn = yTrue.reduce((acc, actual, i) => acc + (actual === 0 && yPred[i] === 0 ? 1 : 0), 0);
  const fn = yTrue.reduce((acc, actual, i) => acc + (actual === 1 && yPred[i] === 0 ? 1 : 0), 0);
  
  const accuracy = (tp + tn) / (tp + fp + tn + fn);
  const precision = tp / (tp + fp) || 0;
  const recall = tp / (tp + fn) || 0;
  const f1Score = 2 * (precision * recall) / (precision + recall) || 0;
  
  return {
    accuracy,
    precision,
    recall,
    f1Score,
    confusionMatrix: [[tn, fp], [fn, tp]]
  };
};
