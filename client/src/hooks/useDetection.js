import { useState, useEffect } from "react";
import { detectImage } from "../services/api";

/*
Custom hook that manages:
- image detection
- loading state
- error handling
- result storage
- history using localStorage
*/

const useDetection = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  /*
  Load previous detection history from localStorage
  */
  useEffect(() => {
    const savedHistory = localStorage.getItem("detectionHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  /*
  Save history to localStorage whenever it changes
  */
  useEffect(() => {
    localStorage.setItem("detectionHistory", JSON.stringify(history));
  }, [history]);

  /*
  Analyze uploaded image
  */
  const analyzeImage = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const data = await detectImage(file);

      const detectionResult = {
        id: Date.now(),
        fileName: file.name,
        prediction: data.prediction,
        confidence: data.confidence,
        explanation: data.explanation,
        time: new Date().toLocaleString(),
      };

      setResult(detectionResult);

      // store in history
      setHistory((prev) => [detectionResult, ...prev]);
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /*
  Clear detection history
  */
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("detectionHistory");
  };

  return {
    result,
    loading,
    error,
    history,
    analyzeImage,
    clearHistory,
  };
};

export default useDetection;
