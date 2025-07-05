import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  TrendingUp, 
  Target, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb,
  BarChart3,
  Zap,
  Calendar,
  Users
} from "lucide-react";

/**
 * @typedef {Object} ProductivityInsights
 * @property {number} total_tasks
 * @property {number} completed_tasks
 * @property {number} completion_rate
 * @property {Object} category_distribution
 * @property {Object} priority_distribution
 * @property {string} most_productive_category
 * @property {number} productivity_score
 * @property {string[]} recommendations
 */

const AIInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch("https://smart-task-tracker-backend-production.up.railway.app/ai/productivity-insights");
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
      } else {
        setError("Failed to fetch insights");
      }
    } catch (error) {
      setError("Error loading insights");
    } finally {
      setLoading(false);
    }
  };

  const getProductivityColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getProductivityIcon = (score) => {
    if (score >= 80) return <TrendingUp className="w-5 h-5" />;
    if (score >= 60) return <Target className="w-5 h-5" />;
    return <AlertCircle className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-6 border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-600 text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!insights || insights.total_tasks === 0) {
    return (
      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="text-center py-4">
            <Lightbulb className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-blue-700 mb-2">AI Insights</h3>
            <p className="text-blue-600">Start adding tasks to get AI-powered productivity insights!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      {/* Main Productivity Score */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Zap className="w-6 h-6 text-purple-500" />
            AI Productivity Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${getProductivityColor(insights.productivity_score)}`}>
                {getProductivityIcon(insights.productivity_score)}
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{insights.productivity_score}</div>
                <div className="text-sm text-gray-600">Productivity Score</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{insights.completion_rate}%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{insights.total_tasks}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{insights.completed_tasks}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-100">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{insights.most_productive_category}</div>
                <div className="text-sm text-gray-600">Top Category</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Category Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(insights.category_distribution).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-medium text-gray-700">{category}</span>
                </div>
                <Badge variant="secondary">{count} tasks</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Priority Distribution */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Priority Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(insights.priority_distribution).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    priority === 'High' ? 'bg-red-500' : 
                    priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="font-medium text-gray-700">{priority}</span>
                </div>
                <Badge variant="secondary">{count} tasks</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {insights.recommendations && insights.recommendations.length > 0 && (
        <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Lightbulb className="w-5 h-5" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <p className="text-sm text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIInsights; 