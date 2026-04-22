import { spawn } from "child_process";
import path from "path";

/*
Controller: detectImage
*/

export const detectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No image uploaded",
      });
    }

    const imagePath = req.file.path;

    /*
    Correct path for model.py
    Works both locally + on Render
    */
    const pythonScript = path.join(process.cwd(), "..", "ai-model", "model.py");

    /*
    IMPORTANT: Use python3 for deployment (Render)
    */
    const pythonCommand =
      process.env.NODE_ENV === "production" ? "python3" : "python";

    const pythonProcess = spawn(pythonCommand, [pythonScript, imagePath]);

    let resultData = "";

    pythonProcess.stdout.on("data", (data) => {
      resultData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });

    pythonProcess.on("close", () => {
      try {
        const result = JSON.parse(resultData);

        res.json({
          prediction: result.prediction,
          confidence: result.confidence,
          explanation: result.explanation,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          error: "Failed to parse AI model response",
        });
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Detection failed",
    });
  }
};
