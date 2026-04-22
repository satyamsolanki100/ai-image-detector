import React from "react";

/*
ResultCard Component

Displays:
- Prediction result
- Confidence score
- Confidence progress bar
- Explanation
*/

const ResultCard = ({ result }) => {
  if (!result) return null;

  const isAI = result.prediction === "AI Generated";

  return (
    <div className="w-full max-w-xl mx-auto mt-8 bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-lg">
      {/* Prediction */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Detection Result</h2>

        <span
          className={`px-4 py-1 rounded-full text-sm font-medium
          ${isAI ? "bg-red-600" : "bg-green-600"}`}
        >
          {result.prediction}
        </span>
      </div>

      {/* Confidence */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Confidence</span>
          <span>{result.confidence.toFixed(2)}%</span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${
              isAI ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${result.confidence}%` }}
          ></div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-4 text-sm text-gray-300">
        <h3 className="font-medium mb-1">Explanation</h3>
        <p>{result.explanation}</p>
      </div>

      {/* Metadata */}
      <div className="mt-6 text-xs text-gray-400 border-t border-gray-700 pt-3">
        <p>File: {result.fileName}</p>
        <p>Analyzed at: {result.time}</p>
      </div>
    </div>
  );
};

export default ResultCard;
