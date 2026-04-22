import React from "react";

/*
HistoryPanel Component

Displays:
- Previous detection results
- Prediction label
- Confidence
- Time
- Clear history option
*/

const HistoryPanel = ({ history, clearHistory }) => {
  if (!history || history.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto mt-8 text-center text-gray-400">
        No detection history yet.
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-10 bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Detection History</h2>

        <button
          onClick={clearHistory}
          className="text-sm text-red-400 hover:text-red-500"
        >
          Clear History
        </button>
      </div>

      {/* History List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {history.map((item) => {
          const isAI = item.prediction === "AI Generated";

          return (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
            >
              <div>
                <p className="text-sm">{item.fileName}</p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    isAI ? "bg-red-600" : "bg-green-600"
                  }`}
                >
                  {item.prediction}
                </span>

                <p className="text-xs text-gray-400 mt-1">
                  {item.confidence.toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPanel;
