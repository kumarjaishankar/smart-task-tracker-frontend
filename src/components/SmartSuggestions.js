import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Lightbulb, 
  Plus, 
  Clock, 
  Target, 
  TrendingUp,
  Calendar,
  BookOpen,
  Heart,
  Briefcase,
  Home
} from "lucide-react";

/**
 * @typedef {Object} SmartSuggestion
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} priority
 * @property {string} icon
 * @property {string} reason
 */

const SmartSuggestions = ({ onAddTask }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateSuggestions();
  }, []);

  const generateSuggestions = () => {
    setLoading(true);
    
    // Simulate AI-generated suggestions based on common productivity patterns
    const commonSuggestions = [
      {
        title: "Review and plan tomorrow's tasks",
        description: "Take 10 minutes to review your progress and plan for tomorrow",
        category: "Planning",
        priority: "Medium",
        icon: "Calendar",
        reason: "Daily planning improves productivity by 25%"
      },
      {
        title: "Take a 5-minute break",
        description: "Step away from your work and stretch or take a short walk",
        category: "Health",
        priority: "Low",
        icon: "Heart",
        reason: "Regular breaks improve focus and reduce stress"
      },
      {
        title: "Organize your workspace",
        description: "Clean up your desk and organize your digital files",
        category: "Personal",
        priority: "Medium",
        icon: "Home",
        reason: "A clean workspace boosts productivity and reduces distractions"
      },
      {
        title: "Learn something new",
        description: "Spend 15 minutes learning a new skill or reading",
        category: "Learning",
        priority: "Low",
        icon: "BookOpen",
        reason: "Continuous learning keeps your mind sharp and opens new opportunities"
      },
      {
        title: "Review your goals",
        description: "Check if your current tasks align with your long-term goals",
        category: "Planning",
        priority: "High",
        icon: "Target",
        reason: "Goal alignment ensures you're working on what matters most"
      },
      {
        title: "Connect with a colleague",
        description: "Reach out to a team member for collaboration or support",
        category: "Work",
        priority: "Medium",
        icon: "Briefcase",
        reason: "Building relationships improves teamwork and career growth"
      }
    ];

    // Randomly select 3-4 suggestions
    const shuffled = commonSuggestions.sort(() => 0.5 - Math.random());
    const selectedSuggestions = shuffled.slice(0, 3 + Math.floor(Math.random() * 2));
    
    setTimeout(() => {
      setSuggestions(selectedSuggestions);
      setLoading(false);
    }, 1000);
  };

  const getIconComponent = (iconName) => {
    const icons = {
      Calendar,
      Heart,
      Home,
      BookOpen,
      Target,
      Briefcase,
      Clock,
      TrendingUp
    };
    return icons[iconName] || Lightbulb;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-600";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "work": return "bg-blue-100 text-blue-600";
      case "personal": return "bg-purple-100 text-purple-600";
      case "planning": return "bg-indigo-100 text-indigo-600";
      case "learning": return "bg-orange-100 text-orange-600";
      case "health": return "bg-pink-100 text-pink-600";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <Card className="mb-6 border-purple-200 bg-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <Lightbulb className="w-6 h-6" />
          AI Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => {
            const IconComponent = getIconComponent(suggestion.icon);
            return (
              <div key={index} className="bg-white/70 rounded-xl p-4 border border-purple-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-full bg-purple-100">
                      <IconComponent className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{suggestion.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(suggestion.category)}>
                          {suggestion.category}
                        </Badge>
                        <Badge className={getPriorityColor(suggestion.priority)}>
                          {suggestion.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-purple-600 italic">💡 {suggestion.reason}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => onAddTask({
                      title: suggestion.title,
                      description: suggestion.description,
                      category: suggestion.category,
                      priority: suggestion.priority,
                      completed: false
                    })}
                    className="ml-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-center mt-6">
          <Button
            onClick={generateSuggestions}
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Get More Suggestions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions; 