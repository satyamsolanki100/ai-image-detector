import React from "react";
import ImageUpload from "../components/ImageUpload";
import ResultCard from "../components/ResultCard";
import HistoryPanel from "../components/HistoryPanel";
import useDetection from "../hooks/useDetection";

/*
Home Page

Combines:
- Image Upload
- Detection Result
- History Panel
*/

const Home = () => {
  const { result, loading, error, history, analyzeImage, clearHistory } =
    useDetection();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">AI Image Authenticity Detector</h1>
        <p className="text-gray-400 mt-2">
          Detect whether an image is AI generated or real
        </p>
      </div>

      {/* Upload Section */}
      <ImageUpload onAnalyze={analyzeImage} loading={loading} />

      {/* Error */}
      {error && <p className="text-center text-red-400 mt-4">{error}</p>}

      {/* Result */}
      <ResultCard result={result} />

      {/* History */}
      <HistoryPanel history={history} clearHistory={clearHistory} />
    </div>
  );
};

export default Home;
