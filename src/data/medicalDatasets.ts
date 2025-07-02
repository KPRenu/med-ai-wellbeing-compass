
/**
 * Medical Dataset Simulation based on Popular Kaggle Datasets
 * 
 * Referenced Kaggle Datasets:
 * 1. "Heart Disease UCI" - https://www.kaggle.com/datasets/ronitf/heart-disease-uci
 * 2. "Chest X-Ray Images (Pneumonia)" - https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia
 * 3. "Diabetes Health Indicators Dataset" - https://www.kaggle.com/datasets/alexteboul/diabetes-health-indicators-dataset
 * 4. "Brain MRI Images for Brain Tumor Detection" - https://www.kaggle.com/datasets/navoneel/brain-mri-images-for-brain-tumor-detection
 */

// Heart Disease Dataset Simulation (UCI Heart Disease Dataset)
export interface HeartDiseaseRecord {
  age: number;
  sex: 'M' | 'F';
  cp: number; // chest pain type (0-3)
  trestbps: number; // resting blood pressure
  chol: number; // cholesterol
  fbs: number; // fasting blood sugar
  restecg: number; // resting electrocardiographic results
  thalach: number; // maximum heart rate achieved
  exang: number; // exercise induced angina
  oldpeak: number; // depression induced by exercise
  slope: number; // slope of peak exercise ST segment
  ca: number; // number of major vessels colored by fluoroscopy
  thal: number; // thalassemia
  target: number; // heart disease (0 = no, 1 = yes)
}

// Chest X-Ray Dataset Simulation
export interface ChestXRayRecord {
  imageId: string;
  diagnosis: 'NORMAL' | 'PNEUMONIA';
  patientAge: number;
  patientSex: 'M' | 'F';
  viewPosition: 'PA' | 'AP';
  confidence: number;
}

// Diabetes Dataset Simulation
export interface DiabetesRecord {
  highBP: number; // 0 or 1
  highChol: number; // 0 or 1
  cholCheck: number; // 0 or 1
  bmi: number;
  smoker: number; // 0 or 1
  stroke: number; // 0 or 1
  heartDiseaseOrAttack: number; // 0 or 1
  physActivity: number; // 0 or 1
  fruits: number; // 0 or 1
  veggies: number; // 0 or 1
  hvyAlcoholConsump: number; // 0 or 1
  anyHealthcare: number; // 0 or 1
  noDocbcCost: number; // 0 or 1
  genHlth: number; // 1-5 scale
  mentHlth: number; // 0-30 days
  physHlth: number; // 0-30 days
  diffWalk: number; // 0 or 1
  sex: number; // 0 or 1
  age: number; // 1-13 categories
  education: number; // 1-6 scale
  income: number; // 1-8 scale
  diabetes: number; // 0, 1, or 2
}

// Data Generation Functions (Simulating Real Dataset Distributions)

export const generateHeartDiseaseData = (count: number): HeartDiseaseRecord[] => {
  const data: HeartDiseaseRecord[] = [];
  
  for (let i = 0; i < count; i++) {
    // Based on UCI Heart Disease Dataset statistics
    const age = Math.floor(Math.random() * 50) + 29; // Age 29-77
    const sex = Math.random() > 0.68 ? 'M' : 'F'; // ~68% male in original dataset
    
    data.push({
      age,
      sex,
      cp: Math.floor(Math.random() * 4), // 0-3
      trestbps: Math.floor(Math.random() * 80) + 94, // 94-200
      chol: Math.floor(Math.random() * 417) + 126, // 126-564
      fbs: Math.random() > 0.85 ? 1 : 0, // ~15% have fbs > 120
      restecg: Math.floor(Math.random() * 3), // 0-2
      thalach: Math.floor(Math.random() * 131) + 71, // 71-202
      exang: Math.random() > 0.67 ? 1 : 0, // ~33% have exercise angina
      oldpeak: Math.round((Math.random() * 6.2) * 10) / 10, // 0-6.2
      slope: Math.floor(Math.random() * 3), // 0-2
      ca: Math.floor(Math.random() * 4), // 0-3
      thal: Math.floor(Math.random() * 3) + 1, // 1-3
      target: Math.random() > 0.54 ? 1 : 0 // ~46% have heart disease
    });
  }
  
  return data;
};

export const generateChestXRayData = (count: number): ChestXRayRecord[] => {
  const data: ChestXRayRecord[] = [];
  
  for (let i = 0; i < count; i++) {
    const isPneumonia = Math.random() > 0.75; // ~25% pneumonia cases
    
    data.push({
      imageId: `chest_xray_${i.toString().padStart(5, '0')}`,
      diagnosis: isPneumonia ? 'PNEUMONIA' : 'NORMAL',
      patientAge: Math.floor(Math.random() * 80) + 1,
      patientSex: Math.random() > 0.5 ? 'M' : 'F',
      viewPosition: Math.random() > 0.7 ? 'AP' : 'PA',
      confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
    });
  }
  
  return data;
};

export const generateDiabetesData = (count: number): DiabetesRecord[] => {
  const data: DiabetesRecord[] = [];
  
  for (let i = 0; i < count; i++) {
    // Based on Diabetes Health Indicators Dataset distributions
    data.push({
      highBP: Math.random() > 0.6 ? 1 : 0,
      highChol: Math.random() > 0.6 ? 1 : 0,
      cholCheck: Math.random() > 0.05 ? 1 : 0,
      bmi: Math.round((Math.random() * 40 + 15) * 100) / 100,
      smoker: Math.random() > 0.8 ? 1 : 0,
      stroke: Math.random() > 0.95 ? 1 : 0,
      heartDiseaseOrAttack: Math.random() > 0.9 ? 1 : 0,
      physActivity: Math.random() > 0.25 ? 1 : 0,
      fruits: Math.random() > 0.4 ? 1 : 0,
      veggies: Math.random() > 0.2 ? 1 : 0,
      hvyAlcoholConsump: Math.random() > 0.95 ? 1 : 0,
      anyHealthcare: Math.random() > 0.05 ? 1 : 0,
      noDocbcCost: Math.random() > 0.85 ? 1 : 0,
      genHlth: Math.floor(Math.random() * 5) + 1,
      mentHlth: Math.floor(Math.random() * 31),
      physHlth: Math.floor(Math.random() * 31),
      diffWalk: Math.random() > 0.8 ? 1 : 0,
      sex: Math.random() > 0.5 ? 1 : 0,
      age: Math.floor(Math.random() * 13) + 1,
      education: Math.floor(Math.random() * 6) + 1,
      income: Math.floor(Math.random() * 8) + 1,
      diabetes: Math.random() > 0.85 ? (Math.random() > 0.5 ? 2 : 1) : 0
    });
  }
  
  return data;
};

// Data Normalization Functions (JavaScript equivalent of Python preprocessing)

export const normalizeHeartDiseaseData = (data: HeartDiseaseRecord[]): number[][] => {
  // Min-Max normalization similar to sklearn.preprocessing.MinMaxScaler
  const features = data.map(record => [
    record.age, record.trestbps, record.chol, record.fbs,
    record.restecg, record.thalach, record.exang, record.oldpeak,
    record.slope, record.ca, record.thal
  ]);
  
  // Calculate min/max for each feature
  const mins = features[0].map((_, colIndex) => 
    Math.min(...features.map(row => row[colIndex]))
  );
  const maxs = features[0].map((_, colIndex) => 
    Math.max(...features.map(row => row[colIndex]))
  );
  
  // Normalize each feature to 0-1 range
  return features.map(row => 
    row.map((value, index) => (value - mins[index]) / (maxs[index] - mins[index]))
  );
};

export const standardizeData = (data: number[][]): number[][] => {
  // Z-score standardization similar to sklearn.preprocessing.StandardScaler
  const means = data[0].map((_, colIndex) => {
    const sum = data.reduce((acc, row) => acc + row[colIndex], 0);
    return sum / data.length;
  });
  
  const stds = data[0].map((_, colIndex) => {
    const mean = means[colIndex];
    const variance = data.reduce((acc, row) => acc + Math.pow(row[colIndex] - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
  });
  
  return data.map(row => 
    row.map((value, index) => (value - means[index]) / stds[index])
  );
};

// Feature Engineering Functions

export const createPolynomialFeatures = (data: number[][], degree: number = 2): number[][] => {
  // Create polynomial features (similar to sklearn.preprocessing.PolynomialFeatures)
  return data.map(row => {
    const polyFeatures = [...row];
    
    if (degree >= 2) {
      // Add squared terms
      for (let i = 0; i < row.length; i++) {
        polyFeatures.push(row[i] * row[i]);
      }
      
      // Add interaction terms
      for (let i = 0; i < row.length; i++) {
        for (let j = i + 1; j < row.length; j++) {
          polyFeatures.push(row[i] * row[j]);
        }
      }
    }
    
    return polyFeatures;
  });
};

// Dataset Metadata (matching real Kaggle datasets)

export const DATASET_METADATA = {
  heartDisease: {
    name: "Heart Disease UCI",
    kaggleUrl: "https://www.kaggle.com/datasets/ronitf/heart-disease-uci",
    description: "Heart disease dataset for binary classification",
    features: 13,
    samples: 303,
    target: "Heart disease presence (0/1)",
    citation: "Dua, D. and Graff, C. (2019). UCI Machine Learning Repository"
  },
  chestXray: {
    name: "Chest X-Ray Images (Pneumonia)",
    kaggleUrl: "https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia",
    description: "Chest X-ray images for pneumonia detection",
    classes: ["NORMAL", "PNEUMONIA"],
    totalImages: 5863,
    imageSize: "224x224 pixels",
    citation: "Kermany, Daniel; Zhang, Kang; Goldbaum, Michael (2018)"
  },
  diabetes: {
    name: "Diabetes Health Indicators Dataset",
    kaggleUrl: "https://www.kaggle.com/datasets/alexteboul/diabetes-health-indicators-dataset",
    description: "CDC survey data for diabetes prediction",
    features: 21,
    samples: 253680,
    classes: ["No diabetes", "Prediabetes", "Diabetes"],
    citation: "CDC Behavioral Risk Factor Surveillance System (BRFSS)"
  }
};
