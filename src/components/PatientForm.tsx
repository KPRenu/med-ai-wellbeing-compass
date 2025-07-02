import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User, Calendar, Heart } from 'lucide-react';
import { predictDiseaseProgression } from '@/utils/mlModels';

const PatientForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    cholesterol: '',
    bloodSugar: '',
    bmi: '',
    smokingStatus: '',
    familyHistory: '',
    symptoms: '',
    medications: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    
    try {
      // Use real ML prediction
      const prediction = await predictDiseaseProgression(formData);
      console.log("ML Prediction:", prediction);
      onSubmit({ ...formData, prediction });
    } catch (error) {
      console.error("Error in ML prediction:", error);
      // Fallback to simulated prediction
      onSubmit(formData);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Patient Health Assessment</span>
        </CardTitle>
        <CardDescription>
          Enter patient information for AI-powered health analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => handleChange('gender', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="systolic">Blood Pressure (Systolic)</Label>
              <Input
                id="systolic"
                type="number"
                placeholder="e.g., 120"
                value={formData.bloodPressureSystolic}
                onChange={(e) => handleChange('bloodPressureSystolic', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diastolic">Blood Pressure (Diastolic)</Label>
              <Input
                id="diastolic"
                type="number"
                placeholder="e.g., 80"
                value={formData.bloodPressureDiastolic}
                onChange={(e) => handleChange('bloodPressureDiastolic', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
              <Input
                id="heartRate"
                type="number"
                placeholder="e.g., 72"
                value={formData.heartRate}
                onChange={(e) => handleChange('heartRate', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
              <Input
                id="cholesterol"
                type="number"
                placeholder="e.g., 200"
                value={formData.cholesterol}
                onChange={(e) => handleChange('cholesterol', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
              <Input
                id="bloodSugar"
                type="number"
                placeholder="e.g., 100"
                value={formData.bloodSugar}
                onChange={(e) => handleChange('bloodSugar', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bmi">BMI</Label>
              <Input
                id="bmi"
                type="number"
                step="0.1"
                placeholder="e.g., 24.5"
                value={formData.bmi}
                onChange={(e) => handleChange('bmi', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="smoking">Smoking Status</Label>
            <Select onValueChange={(value) => handleChange('smokingStatus', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select smoking status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never smoked</SelectItem>
                <SelectItem value="former">Former smoker</SelectItem>
                <SelectItem value="current">Current smoker</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="familyHistory">Family History</Label>
            <Textarea
              id="familyHistory"
              placeholder="Enter relevant family medical history..."
              value={formData.familyHistory}
              onChange={(e) => handleChange('familyHistory', e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="symptoms">Current Symptoms</Label>
            <Textarea
              id="symptoms"
              placeholder="Describe any current symptoms..."
              value={formData.symptoms}
              onChange={(e) => handleChange('symptoms', e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medications">Current Medications</Label>
            <Textarea
              id="medications"
              placeholder="List current medications..."
              value={formData.medications}
              onChange={(e) => handleChange('medications', e.target.value)}
              rows={2}
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            <Heart className="h-4 w-4 mr-2" />
            Analyze Health Data
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientForm;
