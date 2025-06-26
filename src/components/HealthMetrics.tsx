
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Heart, Activity, Brain } from 'lucide-react';

const HealthMetrics = () => {
  // Sample data for charts
  const bloodPressureData = [
    { date: '1/1', systolic: 120, diastolic: 80 },
    { date: '1/8', systolic: 125, diastolic: 82 },
    { date: '1/15', systolic: 118, diastolic: 78 },
    { date: '1/22', systolic: 122, diastolic: 81 },
    { date: '1/29', systolic: 119, diastolic: 79 },
    { date: '2/5', systolic: 121, diastolic: 80 },
    { date: '2/12', systolic: 117, diastolic: 77 }
  ];

  const riskDistributionData = [
    { name: 'Low Risk', value: 65, color: '#10B981' },
    { name: 'Medium Risk', value: 25, color: '#F59E0B' },
    { name: 'High Risk', value: 10, color: '#EF4444' }
  ];

  const conditionData = [
    { condition: 'Hypertension', count: 45 },
    { condition: 'Diabetes', count: 32 },
    { condition: 'Heart Disease', count: 28 },
    { condition: 'Obesity', count: 38 },
    { condition: 'High Cholesterol', count: 42 }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-green-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Key Health Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg BP</p>
                <p className="text-2xl font-bold">120/80</p>
                <div className="flex items-center space-x-1 text-sm">
                  {getTrendIcon('stable')}
                  <span className="text-gray-600">Normal</span>
                </div>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Heart Rate</p>
                <p className="text-2xl font-bold">72 BPM</p>
                <div className="flex items-center space-x-1 text-sm">
                  {getTrendIcon('stable')}
                  <span className="text-gray-600">Normal</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Risk Score</p>
                <p className="text-2xl font-bold">25%</p>
                <div className="flex items-center space-x-1 text-sm">
                  {getTrendIcon('down')}
                  <span className="text-green-600">Improving</span>
                </div>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assessments</p>
                <p className="text-2xl font-bold">1,234</p>
                <div className="flex items-center space-x-1 text-sm">
                  {getTrendIcon('up')}
                  <span className="text-blue-600">+12%</span>
                </div>
              </div>
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Pressure Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Blood Pressure Trends</CardTitle>
            <CardDescription>7-day moving average</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bloodPressureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Systolic"
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Diastolic"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Risk Distribution</CardTitle>
            <CardDescription>Current patient population</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Common Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Most Common Conditions</CardTitle>
            <CardDescription>Detected in patient assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conditionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="condition" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Model Performance */}
        <Card>
          <CardHeader>
            <CardTitle>AI Model Performance</CardTitle>
            <CardDescription>Accuracy metrics for different models</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Disease Progression</span>
                  <span className="text-sm text-gray-600">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Image Classification</span>
                  <span className="text-sm text-gray-600">91.8%</span>
                </div>
                <Progress value={91.8} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Risk Assessment</span>
                  <span className="text-sm text-gray-600">96.5%</span>
                </div>
                <Progress value={96.5} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Treatment Matching</span>
                  <span className="text-sm text-gray-600">89.3%</span>
                </div>
                <Progress value={89.3} className="h-2" />
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall System Accuracy</span>
                <Badge className="bg-green-100 text-green-800">93.2%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthMetrics;
