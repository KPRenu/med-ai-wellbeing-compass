
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Heart, Brain, Upload, Activity, TrendingUp, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import PatientForm from '@/components/PatientForm';
import ImageAnalysis from '@/components/ImageAnalysis';
import TreatmentRecommendations from '@/components/TreatmentRecommendations';
import HealthMetrics from '@/components/HealthMetrics';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [patientData, setPatientData] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const { toast } = useToast();

  const handlePatientSubmit = (data) => {
    console.log("Patient data received:", data);
    
    // Simulate ML prediction
    const riskScore = Math.random() * 100;
    const prediction = {
      riskScore: riskScore,
      riskLevel: riskScore > 70 ? 'High' : riskScore > 40 ? 'Medium' : 'Low',
      progressionLikelihood: riskScore > 60 ? 'Likely' : 'Unlikely',
      recommendations: generateRecommendations(riskScore)
    };
    
    setPatientData(data);
    setAnalysisResults(prediction);
    
    toast({
      title: "Analysis Complete",
      description: "Patient health assessment has been processed successfully.",
    });
  };

  const generateRecommendations = (riskScore) => {
    const recommendations = [];
    
    if (riskScore > 70) {
      recommendations.push("Immediate medical consultation required");
      recommendations.push("Consider hospitalization for monitoring");
      recommendations.push("Intensive medication therapy");
    } else if (riskScore > 40) {
      recommendations.push("Regular medical check-ups recommended");
      recommendations.push("Lifestyle modifications needed");
      recommendations.push("Monitor blood pressure daily");
    } else {
      recommendations.push("Continue current health regimen");
      recommendations.push("Annual health screenings");
      recommendations.push("Maintain healthy lifestyle");
    }
    
    return recommendations;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">MediTrack AI</h1>
                <p className="text-sm text-gray-600">Personalized Health Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                HIPAA Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="assessment" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Health Assessment</span>
            </TabsTrigger>
            <TabsTrigger value="imaging" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Medical Imaging</span>
            </TabsTrigger>
            <TabsTrigger value="treatment" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Treatment Plan</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Heart className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs opacity-90">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Assessments Today</CardTitle>
                  <Activity className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs opacity-90">+8% from yesterday</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High Risk Cases</CardTitle>
                  <AlertTriangle className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs opacity-90">Requires attention</p>
                </CardContent>
              </Card>
            </div>

            <HealthMetrics />
          </TabsContent>

          <TabsContent value="assessment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PatientForm onSubmit={handlePatientSubmit} />
              
              {analysisResults && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Analysis Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Risk Score</span>
                        <Badge 
                          variant={analysisResults.riskLevel === 'High' ? 'destructive' : 
                                 analysisResults.riskLevel === 'Medium' ? 'default' : 'secondary'}
                        >
                          {analysisResults.riskLevel}
                        </Badge>
                      </div>
                      <Progress value={analysisResults.riskScore} className="h-2" />
                      <p className="text-xs text-gray-600">{Math.round(analysisResults.riskScore)}% risk score</p>
                    </div>
                    
                    <Alert className={analysisResults.riskLevel === 'High' ? 'border-red-200 bg-red-50' : ''}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Disease Progression: {analysisResults.progressionLikelihood}</AlertTitle>
                      <AlertDescription>
                        Based on the provided health metrics and our AI analysis.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="imaging" className="space-y-6">
            <ImageAnalysis />
          </TabsContent>

          <TabsContent value="treatment" className="space-y-6">
            <TreatmentRecommendations 
              patientData={patientData} 
              analysisResults={analysisResults} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
