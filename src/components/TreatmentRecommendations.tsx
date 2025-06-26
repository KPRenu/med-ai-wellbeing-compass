
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Pill, 
  Activity, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  Phone
} from 'lucide-react';

const TreatmentRecommendations = ({ patientData, analysisResults }) => {
  if (!patientData || !analysisResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Pill className="h-5 w-5" />
            <span>Treatment Recommendations</span>
          </CardTitle>
          <CardDescription>
            Complete health assessment to receive personalized treatment recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No patient data available for treatment recommendations</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const generateMedications = (riskLevel) => {
    const medications = {
      'High': [
        { name: 'Lisinopril', dosage: '10mg daily', purpose: 'Blood pressure control' },
        { name: 'Atorvastatin', dosage: '40mg daily', purpose: 'Cholesterol management' },
        { name: 'Metformin', dosage: '500mg twice daily', purpose: 'Blood sugar control' },
        { name: 'Aspirin', dosage: '81mg daily', purpose: 'Cardiovascular protection' }
      ],
      'Medium': [
        { name: 'Lisinopril', dosage: '5mg daily', purpose: 'Blood pressure control' },
        { name: 'Atorvastatin', dosage: '20mg daily', purpose: 'Cholesterol management' },
        { name: 'Aspirin', dosage: '81mg daily', purpose: 'Cardiovascular protection' }
      ],
      'Low': [
        { name: 'Multivitamin', dosage: '1 tablet daily', purpose: 'General health support' },
        { name: 'Omega-3', dosage: '1000mg daily', purpose: 'Heart health' }
      ]
    };
    
    return medications[riskLevel] || medications['Low'];
  };

  const generateLifestyleRecommendations = (riskLevel) => {
    const lifestyle = {
      'High': [
        'Strict low-sodium diet (< 2000mg/day)',
        'Regular cardio exercise (30 min, 5x/week)',
        'Weight management program',
        'Stress reduction techniques',
        'Smoking cessation if applicable',
        'Limit alcohol consumption'
      ],
      'Medium': [
        'Balanced diet with reduced sodium',
        'Regular exercise (150 min/week)',
        'Weight monitoring',
        'Stress management',
        'Limited alcohol intake'
      ],
      'Low': [
        'Maintain healthy diet',
        'Regular physical activity',
        'Annual health check-ups',
        'Healthy sleep habits'
      ]
    };
    
    return lifestyle[riskLevel] || lifestyle['Low'];
  };

  const medications = generateMedications(analysisResults.riskLevel);
  const lifestyleRecommendations = generateLifestyleRecommendations(analysisResults.riskLevel);

  return (
    <div className="space-y-6">
      {/* Treatment Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Pill className="h-5 w-5" />
            <span>Personalized Treatment Plan</span>
          </CardTitle>
          <CardDescription>
            Based on AI analysis of patient health data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(analysisResults.riskScore)}%
              </div>
              <div className="text-sm text-gray-600">Risk Score</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {analysisResults.riskLevel}
              </div>
              <div className="text-sm text-gray-600">Risk Level</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">
                {medications.length}
              </div>
              <div className="text-sm text-gray-600">Medications</div>
            </div>
          </div>
          
          <Alert className={
            analysisResults.riskLevel === 'High' ? 'border-red-200 bg-red-50' :
            analysisResults.riskLevel === 'Medium' ? 'border-yellow-200 bg-yellow-50' :
            'border-green-200 bg-green-50'
          }>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Treatment Priority: {analysisResults.riskLevel}</AlertTitle>
            <AlertDescription>
              {analysisResults.riskLevel === 'High' 
                ? 'Immediate medical attention and intensive treatment required'
                : analysisResults.riskLevel === 'Medium'
                ? 'Regular monitoring and preventive measures recommended'
                : 'Continue current health regimen with routine check-ups'
              }
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medication Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Pill className="h-5 w-5" />
              <span>Medication Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{med.name}</div>
                    <div className="text-sm text-gray-600">{med.dosage}</div>
                    <div className="text-xs text-gray-500">{med.purpose}</div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              ))}
            </div>
            
            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                These are AI-generated suggestions. Always consult with a healthcare provider 
                before starting any medication regimen.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Lifestyle Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Lifestyle Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lifestyleRecommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{recommendation}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Follow-up Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Follow-up Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Next Check-up</div>
                  <div className="text-sm text-gray-600">
                    {analysisResults.riskLevel === 'High' ? '1 week' : 
                     analysisResults.riskLevel === 'Medium' ? '1 month' : '3 months'}
                  </div>
                </div>
                <Badge variant="outline">Scheduled</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Lab Work</div>
                  <div className="text-sm text-gray-600">
                    {analysisResults.riskLevel === 'High' ? '2 weeks' : 
                     analysisResults.riskLevel === 'Medium' ? '6 weeks' : '6 months'}
                  </div>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Specialist Consultation</div>
                  <div className="text-sm text-gray-600">
                    {analysisResults.riskLevel === 'High' ? 'ASAP' : 'As needed'}
                  </div>
                </div>
                <Badge variant={analysisResults.riskLevel === 'High' ? 'destructive' : 'outline'}>
                  {analysisResults.riskLevel === 'High' ? 'Urgent' : 'Optional'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Emergency Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>When to Seek Immediate Care</AlertTitle>
              <AlertDescription className="space-y-1">
                <div>• Chest pain or pressure</div>
                <div>• Severe shortness of breath</div>
                <div>• Blood pressure &gt; 180/120</div>
                <div>• Severe headache or dizziness</div>
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Phone className="h-4 w-4 mr-2" />
                Emergency: 911
              </Button>
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Healthcare Provider: (555) 123-4567
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button className="flex-1 min-w-[200px]">
              <Download className="h-4 w-4 mr-2" />
              Download Treatment Plan
            </Button>
            <Button variant="outline" className="flex-1 min-w-[200px]">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
            <Button variant="outline" className="flex-1 min-w-[200px]">
              <Phone className="h-4 w-4 mr-2" />
              Contact Healthcare Provider
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreatmentRecommendations;
