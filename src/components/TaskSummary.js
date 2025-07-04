import { Card, CardContent } from "../components/ui/card";
import { CheckCircle2, Circle, TrendingUp } from "lucide-react";

/**
 * @typedef {Object} Summary
 * @property {number} total
 * @property {number} completed
 * @property {number} percent_completed
 */

/**
 * @typedef {Object} TaskSummaryProps
 * @property {Summary} summary
 */

const TaskSummary = ({ summary }) => {
  const percent = isNaN(summary.percent_completed) ? 0 : summary.percent_completed;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* Total Tasks Card */}
      <div className="bg-blue-600 text-white rounded-2xl shadow-2xl flex items-center justify-between px-8 py-6 min-w-[220px]">
        <div>
          <div className="text-lg font-semibold mb-1">Total Tasks</div>
          <div className="text-4xl font-extrabold">{summary.total}</div>
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-700/30">
          <Circle className="w-7 h-7 text-white/80" />
        </div>
      </div>
      {/* Completed Card */}
      <div className="bg-green-500 text-white rounded-2xl shadow-2xl flex items-center justify-between px-8 py-6 min-w-[220px]">
        <div>
          <div className="text-lg font-semibold mb-1">Completed</div>
          <div className="text-4xl font-extrabold">{summary.completed}</div>
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-700/30">
          <CheckCircle2 className="w-7 h-7 text-white/80" />
        </div>
      </div>
      {/* Progress Card */}
      <div className="bg-purple-500 text-white rounded-2xl shadow-2xl flex items-center justify-between px-8 py-6 min-w-[220px]">
        <div>
          <div className="text-lg font-semibold mb-1">Progress</div>
          <div className="text-4xl font-extrabold">{percent.toFixed(0)}%</div>
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-700/30">
          <TrendingUp className="w-7 h-7 text-white/80" />
        </div>
      </div>
      {/* Progress Bar */}
      <div className="md:col-span-3 bg-white/90 border-0 shadow-lg rounded-2xl mt-2 px-8 py-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">Overall Progress</h3>
          <span className="text-base text-gray-600">
            {summary.completed} of {summary.total} tasks completed
          </span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-4 bg-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;