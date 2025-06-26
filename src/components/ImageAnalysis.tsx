
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, Brain, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ImageAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setAnalysisResult(null);
        console.log("File selected:", file.name);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file (JPEG, PNG, etc.)",
          variant: "destructive"
        });
      }
    }
  };

  const simulateImageAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const mockResults = [
        {
          condition: "Normal",
          confidence: 85 + Math.random() * 10,
          description: "No significant abnormalities detected",
          severity: "low"
        },
        {
          condition: "Pneumonia",
          confidence: 75 + Math.random() * 15,
          description: "Signs of inflammation in lung tissue",
          severity: "high"
        },
        {
          condition: "Fracture",
          confidence: 90 + Math.random() * 8,
          description: "Bone fracture detected in the examined area",
          severity: "medium"
        },
        {
          condition: "Tumor",
          confidence: 70 + Math.random() * 20,
          description: "Suspicious mass requiring further investigation",
          severity: "high"
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Medical image has been analyzed with ${Math.round(randomResult.confidence)}% confidence.`,
      });
    }, 3000);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Medical Image Analysis</span>
          </CardTitle>
          <CardDescription>
            Upload X-ray, MRI, or CT scan images for AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">
                Click to upload medical image
              </span>
              <span className="text-xs text-gray-400">
                Supports JPEG, PNG, DICOM formats
              </span>
            </label>
          </div>
          
          {selectedFile && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFile}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                onClick={simulateImageAnalysis}
                disabled={isAnalyzing}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing Image...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze Medical Image
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {(analysisResult || isAnalyzing) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>Analysis Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAnalyzing ? (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">AI is analyzing your medical image...</p>
                </div>
                <Progress value={33} className="h-2" />
                <p className="text-xs text-center text-gray-500">This may take a few moments</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Detected Condition:</span>
                  <Badge 
                    variant={
                      analysisResult.severity === 'high' ? 'destructive' : 
                      analysisResult.severity === 'medium' ? 'default' : 'secondary'
                    }
                  >
                    {analysisResult.condition}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Confidence Level</span>
                    <span className="text-sm text-gray-600">
                      {Math.round(analysisResult.confidence)}%
                    </span>
                  </div>
                  <Progress value={analysisResult.confidence} className="h-2" />
                </div>
                
                <Alert className={
                  analysisResult.severity === 'high' ? 'border-red-200 bg-red-50' :
                  analysisResult.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                  'border-green-200 bg-green-50'
                }>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Clinical Findings</AlertTitle>
                  <AlertDescription>{analysisResult.description}</AlertDescription>
                </Alert>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Important Note</h4>
                  <p className="text-sm text-blue-800">
                    This AI analysis is for educational purposes only and should not replace 
                    professional medical diagnosis. Please consult with a qualified healthcare 
                    provider for proper medical evaluation.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageAnalysis;
